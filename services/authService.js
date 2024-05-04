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
    expiryTime: await commonHelper.otpExpiryTime(1), // 60 seconds
  };
  const otpData = new OtpLogs(data);

  await otpData.save();
  return data.otp;
};

module.exports = {
  verifyEmail,
  sendOtp,
};
