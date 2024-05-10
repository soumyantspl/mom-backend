const Employee = require("../models/employeeModel");
const SignInLogs = require("../models/signInLogsModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commomHelper");
const emailService = require("./emailService");
const authMiddleware = require("../middlewares/authMiddleware");
const emailTemplates = require("../emailSetUp/emailTemplates");
const emailConstants = require("../constants/emailConstants");
/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  console.log("----------------------33333", email);
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organizationId: 1, name: 1 }
  );
};

/**FUNC- TO SEND OTP TO EMAIL USER */
const sendOtp = async (email, ip) => {
  const userData = await verifyEmail(email);
  console.log("userData------", userData);
  if (userData) {
    return await validateSendingOtp(userData, "Send OTP");
  }
  return false;
};

/**FUNC- TO VERIFY VALID OTP OF USER */
const verifyOtp = async (data) => {
  const otpLogsData = await getOtpLogs(data);
  if (otpLogsData.length !== 0) {
    const userData = otpLogsData[0].userDetail;
    const token = authMiddleware.generatUserToken({
      userId: userData._id,
      name: userData.name,
    });
    console.log(token);
    return {
      token,
      userData,
    };
  }
  return false;
};

/**FUNC- TO OTP LOGS DETAILS */
const getOtpLogs = async (data) => {
  let fromTime = new Date();
  fromTime.setMinutes(
    fromTime.getMinutes() - process.env.CHECK_OTP_VALIDATION_TIME
  ); // CHECK OTP VALIDATION WITH IN MINUTES
  console.log("NOW--------------", fromTime);
  console.log("CURRENT-----------", new Date());

  return await OtpLogs.aggregate([
    {
      $match: {
        email: data.email,
        otp: parseInt(data.otp),
        createdAt: {
          $gte: fromTime, // IN MINUTES
          $lt: new Date(),
        },
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "email",
        foreignField: "email",
        as: "userDetail",
      },
    },
    {
      $project: {
        _id: 1,
        email: 1,
        otp: 1,
        userDetail: {
          name: 1,
          _id: 1,
          email: 1,
        },
      },
    },
    { $unwind: "$userDetail" },
  ]);
};

/**FUNC- TO INSERT OTP DETAILS IN OTP LOGS */
const insertOtp = async (
  userData,
  otpResendCount = 0,
  otpResendTime = null,
  emailType
) => {
  const data = {
    otp: commonHelper.generateOtp(),
    email: userData.email,
    organizationId: userData.organizationId,
    expiryTime: commonHelper.otpExpiryTime(2), // 10 minutes
    otpResendCount,
    otpResendTime,
  };
  const otpData = new OtpLogs(data);
  await otpData.save();
  console.log("-------------------------------1", userData, data.otp);
  const mailData = await emailTemplates.signInByOtpEmail(userData, data.otp);
  const emailSubject = emailConstants.signInOtpsubject;
  await emailService.sendEmail(
    userData.email,
    emailType,
    emailSubject,
    mailData
  );
  return data.otp;
};

/**FUNC- TO RESEND OTP  */
const reSendOtp = async (email) => {
  const userData = await verifyEmail(email);
  console.log("userData-------------", userData);
  if (userData) {
    return await validateSendingOtp(userData, "Resend OTP");
  }
  return false;
};
// FUNCTION TO VALIDATE SENDING OTP
const validateSendingOtp = async (userData, emailType) => {
  let otpResendTime;
  let otpResendCount;
  const rulesData = await checkReSendOtpRules(userData);
  console.log("rulesData-----------------", rulesData);
  if (rulesData?.isNewRecordCreated) {
    otpResendTime = new Date();
    otpResendCount = 1;
    console.log("final user data-----------", userData);
    return await insertOtp(userData, otpResendCount, otpResendTime, emailType);
  }

  if (rulesData?.isReSendOtpAllowed) {
    otpResendTime = rulesData.otpResendTime;
    otpResendCount = rulesData.otpResendCount;
    console.log("final user data-----------", userData);
    return await insertOtp(userData, otpResendCount, otpResendTime, emailType);
  }
  if (!rulesData.isReSendOtpAllowed) {
    return rulesData;
  }
};

/**FUNC- TO VERIFY SEND OTP RULES   */
const checkReSendOtpRules = async (userData) => {
  const otpLogsData = await OtpLogs.findOne({ email: userData.email }).sort({
    createdAt: -1,
  });
  console.log("otpLogsData----------------", otpLogsData);
  if (otpLogsData) {
    let otpResendTime = otpLogsData.otpResendTime;
    let otpResendCount = otpLogsData.otpResendCount;
    console.log("otpResendTime-----------------", otpResendTime);
    if (otpResendTime) {
      const timeDifference = commonHelper.checkTimeDifference(
        new Date(),
        otpResendTime
      );
      console.log(
        "=======================",
        timeDifference <= process.env.OTP_MAX_RESEND_TIMEINMINUTES
      );
      // if resend count is more than or equals to 3(max resend number)
      //&& time difference between current time & first resend attemt time is less than 3 hour
      if (
        otpResendCount == process.env.OTP_MAX_RESENDCOUNT &&
        timeDifference <= process.env.OTP_MAX_RESEND_TIMEINMINUTES
      ) {
        console.log("--------111");
        return {
          otpResendMaxTimeLimitCrossed: false,
          isReSendOtpAllowed: false,
          otpResendCount,
        };
      }
      // if resend count is less than  3(max resend number)
      //&& time difference between current time & first resend attemt time is less than 3 hour
      if (
        otpResendCount < process.env.OTP_MAX_RESENDCOUNT &&
        timeDifference <= process.env.OTP_MAX_RESEND_TIMEINMINUTES
      ) {
        console.log("--------222");
        return {
          otpResendMaxTimeLimitCrossed: false,
          otpResendCount: otpResendCount + 1,
          isReSendOtpAllowed: true,
          otpResendTime,
        };
      }

      // if resend count is less than  3(max resend number)
      //&& time difference between current time & first resend attemt time is greater than 3 hour
      if (
        otpResendCount <= process.env.OTP_MAX_RESENDCOUNT &&
        timeDifference >= process.env.OTP_MAX_RESEND_TIMEINMINUTES
      ) {
        console.log("--------333");
        otpResendCount++;
        return {
          otpResendMaxTimeLimitCrossed: true,
          otpResendCount: 0,
          otpResendTime: new Date(),
          isReSendOtpAllowed: true,
        };
      }
    } else {
      console.log("--------");
      return {
        isNewRecordCreated: true,
      };
    }
  }
  console.log("--------");
  return {
    isNewRecordCreated: true,
  };
};

/**FUNC- TO SET PASSWORD   */
const setPassword = async (data) => {
  const userData = await verifyEmail(data.email);
  console.log("userData-------------", userData);
  if (userData) {
    const otpData = {
      email: data.email,
      otp: data.otp,
    };
    const isOtpVeified = await getOtpLogs(otpData);
    console.log("isOtpVeified------------", isOtpVeified);
    if (isOtpVeified.length !== 0) {
      const hashedPassword = await commonHelper.generetHashPassword(
        data.password
      );
      return await Employee.updateOne(
        { email: data.email },
        { password: hashedPassword }
      );
    } else {
      return {
        isInValidOtp: true,
      };
    }
  }
  return false;
};

/**FUNC- TO CHECK SIGN IN LOGS DETAILS */
const isIpBlocked = async (ipAddress) => {
  let fromTime = new Date();
  fromTime.setMinutes(
    fromTime.getMinutes() - process.env.CHECK_SIGNIN_BLOCK_TIME
  ); // CHECK OTP VALIDATION WITH IN MINUTES
  console.log("NOW--------------", fromTime);
  console.log("CURRENT-----------", new Date());
  const signInLogsData = await SignInLogs.findOne({ ipAddress,
    createdAt: {
      $gte: fromTime, // IN MINUTES
      $lt: new Date(),
    },

   }).sort({
    createdAt: -1,
  });
  console.log("signInLogsData------", signInLogsData);

  return signInLogsData;
};
// 1ST CHECK IS BLOCKED OR NOT -FALSE
// 2ND CHECK LOGIN RESPONSE , IF SUCCESS JUST ADD DATA
// 3.IF FAIL JUST UPDATE DATA
// 4.IF looginAttempt == 3 ,THEN BLOCK THE IP FOR 24 HOURS
// const inputData={
//   email,
//   ipAddress,
//   isLoggedinSuccess:false,
//   isIpAddressBlocked:false,
//   looginAttempt:0,
// //  organizationId
// wrongLoginAttemptTime:new Date()
// }

/**FUNC- FOR SIGN IN BY PASSWORD   */
const signInByPassword = async (data, ipAddress) => {
  // CHECK IP ADDRESS IS BLOCKED OR NOT
  const signInLogsData = await isIpBlocked(ipAddress);
  console.log('signInLogsData------',signInLogsData)
  console.log('ipAddress------',ipAddress)
  if (signInLogsData?.isIpAddressBlocked) {
    // IF BLOCKED RETURN WITH ERROR RESPONSE
    return {
      isIpBlocked: true,
    };
  }
  const userData = await Employee.findOne(
    { email: data.email },
    { _id: 1, email: 1, organizationId: 1, name: 1, password: 1, isActive: 1 }
  );
  console.log("userData----------", userData);
  if (!userData) {
    // IF LOGIN ATTEMPT FAIL FOR WRONG USER NAME/EMAIL GET LAST LOGIN ATTEMPT DETAILS 

    const loginAttempt = signInLogsData?parseInt(signInLogsData.loginAttempt)+1:1;
   
    const signInData = {
      email:data.email,
      ipAddress,
      isLoggedinSuccess: false,
      isIpAddressBlocked: loginAttempt == process.env.WRONG_SIGNIN_ATTEMPT_LIMIT ? true : false,
      loginAttempt,
      //  organizationId
      wrongLoginAttemptTime: new Date(),
    };
    await saveSignInDetails(signInData);
    return false;
  }
  // Based on user Status
  if (!userData.isActive) {
    return {
      isUserDeactivated: true,
    };
  }
  const passwordIsValid = await commonHelper.verifyPassword(
    data.password,
    userData.password
  );
  console.log(passwordIsValid);
  // Check correct password
  if (!passwordIsValid) {
    return {
      incorrectPassword: true,
    };
  }

  const token = authMiddleware.generatUserToken({
    userId: userData._id,
    name: userData.name,
  });
  console.log(token);
  delete userData.password;

  const signInData = {
    email:data.email,
    ipAddress,
    isLoggedinSuccess: true,
    isIpAddressBlocked: false,
    loginAttempt:0,
    //  organizationId
    wrongLoginAttemptTime: new Date(),
  };
  await saveSignInDetails(signInData);
  return {
    token,
    userData: {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      organizationId: userData.organizationId,
    },
  };
};

const saveSignInDetails=async (signInDetails)=>{
  const signInData = new SignInLogs(signInDetails);
  return await signInData.save();
}


module.exports = {
  verifyEmail,
  sendOtp,
  verifyOtp,
  reSendOtp,
  setPassword,
  signInByPassword,
};
