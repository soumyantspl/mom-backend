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
const checkTimeDifference = (toTime, fromTime) => {
  console.log("fromTime---------------------------", fromTime);
  console.log("toTime---------------------------", toTime);
  var difference = Math.abs(fromTime.getTime() - toTime.getTime());
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

const generateLogObject = async (inputKeys, result, userId, data) => {
  let details = [];
  let finalObject = {};
  inputKeys.map((key) => {
    finalObject[key] = {
      oldValue: null,
      newValue: null,
    };
    console.log("finalObject--->>", finalObject);
    console.log("KEY---------------------", key);
    if (key == "rsvp") {
      // console.log(result.attendees.find((item) => item.id == userId).rsvp);
      finalObject[key].oldValue = result.attendees.find(
        (item) => item.id.toString() == userId
      ).rsvp;
    } else {
      finalObject[key].oldValue = result[key];
    }

    console.log(" finalObject[key]---->>>>>>>", finalObject[key]);
    console.log("data key------------->", data);
    finalObject[key].newValue = data[key];
    console.log("finalObject--->>", finalObject);
    details.push(
      `${key} changed from ${finalObject[key].oldValue} to ${finalObject[key].newValue}`
    );
    delete finalObject[key];
    console.log("finalObject--->>", finalObject);
  });
  console.log("finalObject--------------", finalObject);
  return details;
};

const formatDateTimeFormat = (date) => {
  console.log(date);
  const sourceDate = new Date(date).toDateString();
  const sourceTime = new Date(date).toLocaleTimeString();
  // The above yields e.g. 'Mon Jan 06 2020'
  console.log(sourceTime);
  const [, month, day, year] = sourceDate.split(" ");
  const formattedDate = [day, month, year].join(" ");
  // console.log(formattedDate);

  const [hour, minute, second] = sourceTime.split(" ")[0].split(":");
  const formattedTime =
    [hour, minute].join(":") + " " + sourceTime.split(" ")[1];
  return {
    formattedTime,
    formattedDate,
  };
};

const getTimeSession = (time) => {
  console.log(typeof time);
  const timeArray = time.split(":");
  const timeHour = timeArray[0];

  if (timeHour > 12) {
    return "PM";
  }
  return "AM";
};

module.exports = {
  generateOtp,
  otpExpiryTime,
  checkTimeDifference,
  generetHashPassword,
  verifyPassword,
  generateLogObject,
  formatDateTimeFormat,
  getTimeSession,
};
