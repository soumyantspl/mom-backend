const minutesService = require("../services/minutesService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");

const acceptRejectMinutes = async (req, res) => {
  try {
    const result = await minutesService.acceptRejectMinutes(req.body, req.userId);
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

const createMinutes = async (req, res) => {
  try {
    console.log("in controller------------------------",req.body)
    const result = await minutesService.createMinutes(req.body.minutes,req.userId);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.createError, 409);
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


const downloadMinutes = async (req, res) => {
  try {
    const result = await minutesService.downLoadMinutes(req.params.meetingId);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.recordsNotFound, 409);
    }
    return Responses.successDownloadResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
   
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};



module.exports = {
  acceptRejectMinutes,
  createMinutes,
  downloadMinutes
};
