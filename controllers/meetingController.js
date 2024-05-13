



const meetingService = require("../services/meetingService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE MEETING**/
const createMeeting = async (req, res) => {
  try {
    const result = await meetingService.createMeeting(req.body,'req.userId',req.ip);
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
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO UPDATE MEETING**/
const updateMeeting = async (req, res) => {
  try {
    const result = await meetingService.updateMeeting(req.body,req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.updateFailedRecordNotFound,
        409
      );
    }

   

   

    return Responses.successResponse(
      req,
      res,
      result,
      messages.updateSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};


module.exports = {
  createMeeting,updateMeeting
};


