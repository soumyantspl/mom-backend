const jwt = require("jsonwebtoken");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const employeeService = require("../services/employeeService");
/*FUNC TO GENERATE NEW TOKEN FOR USER*/
const generatUserToken = (data) => {
  token = jwt.sign(data, process.env.JWT_USER_SECRET, {
    //expiresIn: 86400 // 24 hours
    expiresIn: "365d", // 365 days
  });
  return `Bearer ${token}`;
};

/*FUNC TO VERIFY A TOKEN FOR USER*/
const verifyUserToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    console.log(decoded);
    const userId = decoded.userId;
    const isActiveUser = await employeeService.verifyEmployee(userId);
    console.log("isActiveUser------", isActiveUser);
    if (isActiveUser) {
      req.userId = userId;
      next();
    } else {
      console.log("return from jwt verify");
      return Responses.failResponse(req, res, null, messages.invalidUser, 401);
    }
  } catch (error) {
    // console.log(error)
    return Responses.failResponse(req, res, null, messages.invaliToken, 401);
  }
};

module.exports = {
  generatUserToken,
  verifyUserToken,
};