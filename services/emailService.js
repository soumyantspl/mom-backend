const { transporter, mailOptions } = require("../emailSetUp/mailSetup");
const emailTemplates=require('../emailSetUp/emailTemplates')

/**FUNC- TO SEND  OTP TO EMAIL USER */
const sendSignInOtpEmail = async (userData,otp) => {
  const maildata = await emailTemplates.signInByOtpEmail({ name:userData.name, otp });
  const mailOptionsInfo = {
    from: mailOptions.from,
    to: userData.email,
    subject: signInByOtp,
    html: maildata,
  };
  return await transporter.sendMail(mailOptionsInfo);
};

module.exports = {
    sendSignInOtpEmail
};