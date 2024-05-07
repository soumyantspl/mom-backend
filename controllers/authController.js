const authService = require("../services/authService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO SEND OTP TO SIGN IN USER */
const sendOtp = async (req, res) => {
  try {
    const result = await authService.sendOtp(req.body.email);
    console.log("res----", result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 404);
    }
    if (!result?.isReSendOtpAllowed) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.otpResendMaxLimitCrossed,
        404
      );
    }

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
      return Responses.failResponse(req, res, null, messages.invalidOtp, 404);
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.otpVerifiedSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO RESEND OTP TO USER EMAIL*/
const reSendOtp = async (req, res) => {
  try {
    const result = await authService.reSendOtp(req.body.email);

    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 404);
    }
    if (!result?.isReSendOtpAllowed) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.otpResendMaxLimitCrossed,
        404
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.otpVerifiedSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO SET PASSWORD FOR SIGN IN*/
const setPassword = async (req, res) => {
  try {
    const result = await authService.setPassword(req.body);
    
    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 404);
    }
    if (result?.isInValidOtp) {
      return Responses.failResponse(req, res, null, messages.invalidOtp, 404);
    }

    return Responses.successResponse(
      req,
      res,
      null,
      messages.passwordRestSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  reSendOtp,
  setPassword,
};
