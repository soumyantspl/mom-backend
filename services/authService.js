const Employee = require("../models/employeeModel");
const OtpLogs = require("../models/otpLogsModel");
const commonHelper = require("../helpers/commomHelper");
/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, organisationId: 1 }
  );
};

const sendOtp = async (userData) => {
  const isOtpAdded = await insertOtp(userData);
};

const insertOtp = async (userData, otp) => {
  const data = {
    otp: await commonHelper.generateOtp(),
    email: userData.email,
    organisationId: userData.organisationId,
    expiryTime: new Date(),
  };
  const otpData = new OtpLogs(data);

  const isSaved = await otpData.save();
};

module.exports = {
  verifyEmail,
  sendOtp,
};
