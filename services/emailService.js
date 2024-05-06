const { transporter, mailOptions } = require("../emailSetUp/mailSetup");
const emailTemplates=require('../emailSetUp/emailTemplates')

/**FUNC- TO SEND  OTP TO EMAIL USER */
const sendSignInOtpEmail = async (userData,otp) => {
  console.log('-------------------------------1',userData,otp);
  const maildata = await emailTemplates.signInByOtpEmail(userData, otp );
  const mailOptionsInfo = {
    from: mailOptions.from,
    to:userData.email,
    subject: "OTP for sign in!",
    html: maildata,
  };
  console.log(mailOptionsInfo)
  return await transporter.sendMail(mailOptionsInfo);
};

module.exports = {
    sendSignInOtpEmail
};