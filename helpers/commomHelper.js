const bcrypt = require("bcrypt");
const saltRounds = 10;
/**FUNC- TO GENERATE OTP */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/**FUNC- TO GENERATE OTP EXPIRY TIME*/
const otpExpiryTime = (minutes) => {
  let now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
};

/**FUNC- TO GET TIME DIFFERENCE BETWEEN FROM & TO TIME*/
const checkTimeDifference = ( toTime,fromTime) => {
 console.log('fromTime---------------------------',fromTime)
 console.log('toTime---------------------------',toTime)
  var difference  = Math.abs(fromTime.getTime() - toTime.getTime()) ;
  console.log("difference ---------------------", difference);
  var resultInMinutes = Math.round(difference / 60000);
  console.log("resultInMinutes ---------------------", resultInMinutes);
  return resultInMinutes;
};

/*FUNC TO GENERATE HASH PASSWORD*/
const generetHashPassword = async (normalPassword) => {
  return bcrypt.hashSync(normalPassword, saltRounds);
};

/*FUNC TO VERIFY PASSWORD*/
const verifyPassword = async (plianPassword, hashPass) => {
  return bcrypt.compareSync(plianPassword, hashPass);
};

module.exports = {
  generateOtp,
  otpExpiryTime,
  checkTimeDifference,
  generetHashPassword,
  verifyPassword,
};
