const meetingService = require("../services/meetingService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");
/**FUNC- TO CREATE MEETING**/
const createMeeting = async (req, res) => {
  try {
    const result = await meetingService.createMeeting(req.body);
    console.log(result);
    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
        409
      );
    }

    if (result?.isDuplicateEmpCode) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmpCode,
        409
      );
    }

    return Responses.successResponse(
      req,
      res,
      result.data,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const updateRsvp = async (req, res) => {
  try {
    const result = await meetingService.updateRsvp(req.body);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      result.data,
      messages.updateSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const cancelMeeting = async (req, res) => {
  try {
    const result = meetingService.cancelMeeting(req.body);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.canceledFailed,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      result.data,
      messages.canceled,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = {
  createMeeting,
  updateRsvp,
  cancelMeeting
};
