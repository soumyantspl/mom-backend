const Employee = require("../models/employeeModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commomHelper");
const emailService = require("./emailService");
const authMiddleware = require("../middlewares/authMiddleware");
/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1 }
  );
};

/**FUNC- TO SEND OTP TO EMAIL USER */
const sendOtp = async (userData) => {
  return await insertOtp(userData);
  //return isOtpAdded;
  //  return
};

/**FUNC- TO INSERT OTP DETAILS IN OTP LOGS */
const insertOtp = async (userData, otp) => {
  const data = {
    otp: await commonHelper.generateOtp(),
    email: userData.email,
    organisationId: userData.organisationId,
    expiryTime: await commonHelper.otpExpiryTime(2), // 10 minutes
  };
  const otpData = new OtpLogs(data);
  await otpData.save();
  await emailService.sendSignInOtpEmail(userData, data.otp);
  return data.otp;
};

/**FUNC- TO VERIFY VALID OTP OF USER */
const verifyOtp = async (data) => {
  let fromTime = new Date();
  fromTime.setMinutes(fromTime.getMinutes() - 3);
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
    const token = await authMiddleware.generatUserToken({
      userId: userData._id,
    });
    console.log(token);
    return {
      token,
      userData,
    };
  }

  return false;

  /// generate jwt token & store user data & send both in response
};

module.exports = {
  verifyEmail,
  sendOtp,
  verifyOtp,
};
