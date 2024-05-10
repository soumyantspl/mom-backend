const { transporter, mailOptions } = require("../emailSetUp/mailSetup");
const emailTemplates = require("../emailSetUp/emailTemplates");
const EmailLogs = require("../models/emailLogsModel");
/**FUNC- TO SEND  OTP TO EMAIL USER */
const sendSignInOtpEmail = async (userData, otp) => {
  console.log("-------------------------------1", userData, otp);
  const maildata = await emailTemplates.signInByOtpEmail(userData, otp);
  const mailOptionsInfo = {
    from: mailOptions.from,
    to: userData.email,
    subject: "OTP for sign in!",
    html: maildata,
  };
  console.log(mailOptionsInfo);
  const isSuccess = await transporter.sendMail(mailOptionsInfo);
  console.log("isSuccess-------------", isSuccess);
  // const emailLogData = {
  //   emailType: commonHelper.generateOtp(),
  //   emailFrom: mailOptions.from,
  //   emailTo: userData.email,
  //   subject: emailConstants.signInOtpsubject,
  //   body:maildata,
  //   status:,
  // };

  // return  await saveEmailLogs()
  return isSuccess;
};

//  // Insert email log
//  Logemail.create({
//   emailType: bathouseEmailType,
//   emailFrom: mailOptions_info.from,
//   emailTo: mailOptions_info.to,
//   subject: mailOptions_info.subject,
//   body: mailOptions_info.html,
//   status: 1,
//   cronStatus: 0,
//   attachments: ""
// });
/**FUNC- TO SAVE EMAIL LOGS */
const saveEmailLogs = async (emailData) => {
  const emailLogData = new OtpLogs(emailData);
  await otpData.save();
  return await transporter.sendMail(mailOptionsInfo);
};

module.exports = {
  sendSignInOtpEmail,
  saveEmailLogs,
};
