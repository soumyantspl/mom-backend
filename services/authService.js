const Employee = require("../models/employeeModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commomHelper");
const emailService = require("./emailService");

/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1 }
  );
};

/**FUNC- TO SEND OTP TO EMAIL USER */
const sendOtp = async (userData) => {
  const isOtpAdded = await insertOtp(userData);
  return isOtpAdded;
  //return await emailService.sendSignInOtpEmail(userData, otp);
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
  return data.otp;
};

/**FUNC- TO VERIFY VALID OTP OF USER */
const verifyOtp = async (data) => {
  let fromTime = new Date();
  now.setMinutes(now.getMinutes() - 3);
  console.log("NOW--------------", now);
  console.log("CURRENT-----------", new Date());

  return await OtpLogs.findOne({
    $and: [
      { email: data.email, otp: parseInt(data.otp) },
      {
        createdAt: {
          $gte: fromTime,
          $lt: new Date(),
        },
      },
    ],
  });


  /// generate jwt token & store user data & send both in response
};

module.exports = {
  verifyEmail,
  sendOtp,
  verifyOtp,
};
