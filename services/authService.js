const Employee = require("../models/employeeModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commonHelper");
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
const sendOtp = async (email) => {
  const userData = await verifyEmail(email);
  console.log('userData------',userData)
  if (userData) {
    return await validateSendingOtp(userData,"Send OTP");
  }
  return false;
};

/**FUNC- TO VERIFY VALID OTP OF USER */
const verifyOtp = async (data) => {
  const otpLogsData = await getOtpLogs(data);
  if (otpLogsData.length !== 0) {
    const userData = otpLogsData[0].userDetail;
    const token = authMiddleware.generateUserToken({
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
          $gte: fromTime,
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
  
  const mailData = await emailTemplates.sendOtpEmailTemplate(userData, data.otp,process.env.CHECK_OTP_VALIDATION_TIME,"support@ntspl.co.in");
  //const mailData = await emailTemplates.signInByOtpEmail(userData, data.otp);
  const emailSubject=emailConstants.signInOtpsubject;
  console.log("sendOtpEmailTemplate-----------------------maildata",mailData)
  await emailService.sendEmail(userData.email,emailType,emailSubject,mailData);
  return data.otp;
};

/**FUNC- TO RESEND OTP  */
const reSendOtp = async (email) => {
  const userData = await verifyEmail(email);
  console.log("userData-------------", userData);
  if (userData) {
    return await validateSendingOtp(userData,"Resend OTP");
  }
  return false;
};
// FUNCTION TO VALIDATE SENDING OTP
const validateSendingOtp = async (userData,emailType) => {
  let otpResendTime;
  let otpResendCount;
  const rulesData = await checkReSendOtpRules(userData);
  console.log("rulesData-----------------", rulesData);
  if (rulesData?.isNewRecordCreated) {
    otpResendTime = new Date();
    otpResendCount = 1;
    console.log("final user data-----------", userData);
    return await insertOtp(userData, otpResendCount, otpResendTime,emailType);
  }

  if (rulesData?.isReSendOtpAllowed) {
    otpResendTime = rulesData.otpResendTime;
    otpResendCount = rulesData.otpResendCount;
    console.log("final user data-----------", userData);
    return await insertOtp(userData, otpResendCount, otpResendTime,emailType);
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
      console.log("=======================", timeDifference)
      console.log("=======================",  process.env.OTP_MAX_RESEND_TIMEINMINUTES)
      console.log("=======================", timeDifference <= process.env.OTP_MAX_RESEND_TIMEINMINUTES)
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

/**FUNC- FOR SIGN IN BY PASSWORD   */
const signInByPassword = async (data) => {
  const userData = await Employee.findOne(
    { email: data.email },
    { _id: 1, email: 1, organizationId: 1, name: 1, password: 1, isActive: 1 }
  );
  console.log("userData----------", userData);
  if (!userData) {
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

module.exports = {
  verifyEmail,
  sendOtp,
  verifyOtp,
  reSendOtp,
  setPassword,
  signInByPassword,
};
