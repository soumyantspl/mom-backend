
/**FUNC- TO GENERATE OTP */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/**FUNC- TO GENERATE OTP EXPIRY TIME*/
function otpExpiryTime(minutes) {
  let now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

module.exports = {
  generateOtp,
  otpExpiryTime,
};
