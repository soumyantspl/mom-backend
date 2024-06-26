const authService = require("../services/authService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");

/**FUNC- TO SEND OTP TO SIGN IN USER */
const sendOtp = async (req, res) => {
  try {
    const result = await authService.sendOtp(req.body.email);
    console.log("res----", result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }

    // OTP RESEND ALLOWED MAXLIMIT IS 3 & TIME LIMIT IS 10 MINUTES
    if (result?.isReSendOtpAllowed == false) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.otpResendMaxLimitCrossed,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      null,
      await messages.otpSentSuccess(req.body.email),
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VERIFY OTP TO SIGN IN USER */
const verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body);
    console.log("otpFound----------", result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.invalidOtp, 200);
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
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO RESEND OTP TO USER EMAIL*/
const reSendOtp = async (req, res) => {
  try {
    const result = await authService.reSendOtp(req.body.email);

    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }
    if (result?.isReSendOtpAllowed == false) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.otpResendMaxLimitCrossed,
        200
      );
    }
    const message =
      result?.otpResendCount <= 3
        ? await messages.otpResendMessage(result.otpResendCount, req.body.email)
        : await messages.otpSentSuccess(req.body.email);
    return Responses.successResponse(req, res, null, message, 200);
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO SET PASSWORD FOR SIGN IN*/
const setPassword = async (req, res) => {
  try {
    const result = await authService.setPassword(req.body);

    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }
    if (result?.isInValidOtp) {
      return Responses.failResponse(req, res, null, messages.invalidOtp, 200);
    }

    return Responses.successResponse(
      req,
      res,
      null,
      messages.passwordResetSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- FOR SIGN IN BY PASSWORD**/
const signInByPassword = async (req, res) => {
  try {
    const result = await authService.signInByPassword(req.body);
    console.log("eeeeeeeeee",result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.userNotFound, 200);
    }
    if (result?.incorrectPassword) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.incorrectPassword,
        200
      );
    }

    if (result?.isUserDeactivated) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.invalidUser,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.signInSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  reSendOtp,
  setPassword,
  signInByPassword,
};
