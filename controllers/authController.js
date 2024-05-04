const authService = require("../services/authService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO SEND  OTP TO EMAIL USER */
const sendOtp = async (req, res) => {
  try {
    const result = await authService.verifyEmail(req.body.email);
    console.log("userFound----------", result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        result,
        messages.userNotFound,
        404
      );
    }
    await authService.sendOtp(result);
    return Responses.successResponse(
      req,
      res,
      null,
      messages.otpSentSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VERIFY OTP TO SIGN IN USER */
const verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body);
    console.log("otpFound----------", result);
    if (!result) {
      return Responses.failResponse(req, res, result, messages.invaliOtp, 404);
    }
    if (result && result.expired) {
      return Responses.failResponse(req, res, result, messages.expiredOtp, 404);
    }
  
    return Responses.successResponse(
      req,
      res,
      null,
      messages.otpVerifiedSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  sendOtp,verifyOtp
};
