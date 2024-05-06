const Employee = require("../models/employeeModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commomHelper");
const emailService = require("./emailService");
const authMiddleware = require("../middlewares/authMiddleware");
/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  console.log("----------------------33333", email);
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1 }
  );
};

/**FUNC- TO SEND OTP TO EMAIL USER */
const sendOtp = async (email) => {
  const userData = await verifyEmail(email);
  if (userData) {
    return await insertOtp(userData);
  }
  return false;
};

/**FUNC- TO VERIFY VALID OTP OF USER */
const verifyOtp = async (data) => {
  let fromTime = new Date();
  fromTime.setMinutes(fromTime.getMinutes() - 3); // CHECK OTP VALIDATION WITH IN 3 MINUTES
  console.log("NOW--------------", fromTime);
  console.log("CURRENT-----------", new Date());

  const otpLogsData = await OtpLogs.aggregate([
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

  console.log("otpLogsData---------", otpLogsData);
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

/**FUNC- TO INSERT OTP DETAILS IN OTP LOGS */
const insertOtp = async (
  userData,
  otpResendCount = 0,
  otpResendTime = null
) => {
  const data = {
    otp: commonHelper.generateOtp(),
    email: userData.email,
    organisationId: userData.organisationId,
    expiryTime: commonHelper.otpExpiryTime(2), // 10 minutes
    otpResendCount,
    otpResendTime,
  };
  const otpData = new OtpLogs(data);
  await otpData.save();
  await emailService.sendSignInOtpEmail(userData, data.otp);
  return data.otp;
};

/**FUNC- TO RESEND OTP  */
const reSendOtp = async (email) => {
  const userData = await verifyEmail(email);
  console.log("userData-------------", userData);
  if (userData) {
    let otpResendTime;
    let otpResendCount;
    const rulesData = await checkReSendOtpRules(userData);
    console.log("rulesData-----------------", rulesData);
    if (rulesData?.isNewRecordCreated) {
      otpResendTime = new Date();
      otpResendCount = 1;
      console.log("final user data-----------", userData);
      return await insertOtp(userData, otpResendCount, otpResendTime);
    }

    if (rulesData?.isReSendOtpAllowed) {
      otpResendTime = rulesData.otpResendTime;
      otpResendCount = rulesData.otpResendCount;
      console.log("final user data-----------", userData);
      return await insertOtp(userData, otpResendCount, otpResendTime);
    }
    if (!rulesData.isReSendOtpAllowed) {
      return rulesData;
    }
  }

  return false;
};

/**FUNC- TO VERIFY RESEND OTP RULES   */
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
      // if resend count is more than or equals to 3(max resend number)
      //&& time difference between current time & first resend attemt time is less than 3 hour
      if (
        otpResendCount == process.env.OTP_RESENDCOUNT_RESTRCTION &&
        timeDifference <= 180
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
        otpResendCount < process.env.OTP_RESENDCOUNT_RESTRCTION &&
        timeDifference <= 180
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
        otpResendCount <= process.env.OTP_RESENDCOUNT_RESTRCTION &&
        timeDifference >= 180
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
  } else {
    console.log("--------");
    return {
      isNewRecordCreated: true,
    };
  }

  //return false;
};

module.exports = {
  verifyEmail,
  sendOtp,
  verifyOtp,
  reSendOtp,
};
