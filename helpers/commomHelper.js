
/**FUNC- TO GENERATE OTP */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/**FUNC- TO GENERATE OTP EXPIRY TIME*/
const otpExpiryTime= (minutes) => {
  let now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

/**FUNC- TO GET TIME DIFFERENCE BETWEEN FROM & TO TIME*/
const checkTimeDifference=(now,targetTime)=>{
  var diff = Math.abs(now.getTime() - targetTime.getTime()) / 3600000;
  console.log('diff---------------------',diff)
  return diff
}

module.exports = {
  generateOtp,
  otpExpiryTime,
  checkTimeDifference
};
