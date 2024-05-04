const jwt = require("jsonwebtoken");

/*FUNC TO GENERATE NEW TOKEN FOR USER*/
const generatUserToken = (data) => {
  token = jwt.sign(data, process.env.JWT_USER_SECRET, {
    //expiresIn: 86400 // 24 hours
    expiresIn: "365d", // 365 days
  });
  return `Bearer ${token}`;
};

module.exports = {
  generatUserToken,
};
