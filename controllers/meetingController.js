const meetingService = require("../services/meetingService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");
/**FUNC- TO CREATE MEETING**/
const createMeeting = async (req, res) => {
  try {
    const result = await meetingService.createMeeting(
      req.body,
      req.userId,
      req.ip
    );
    console.log(result);
    if (result?.isDuplicateEmail) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
        200
      );
    }

    if (result?.isDuplicateEmpCode) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmpCode,
        200
      );
    }

    return Responses.successResponse(
      req,
      res,
      result,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
/**FUNC- TO UPDATE RSVP DATA**/
const updateRsvp = async (req, res) => {
  try {
    const result = await meetingService.updateRsvp(
      req.params.id,
      req.userId,
      req.body,
      req.ip
    );
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
/**FUNC- TO UPDATE MEETING**/
const updateMeeting = async (req, res) => {
  try {
    const result = await meetingService.updateMeeting(
      req.body,
      req.params.id,
      req.userId,
      req.ip
    );
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
      result,
      messages.updateSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
/**FUNC- TO CANCEL MEETING**/
const cancelMeeting = async (req, res) => {
  try {
    const result = meetingService.cancelMeeting(
      req.params.id,
      req.userId,
      req.body,
      req.ip
    );
    if (!result) {
      return Responses.failResponse(req, res, null, messages.cancelFailed, 409);
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

/**FUNC- TO VIEW ALL MEETING DETAILS**/
const viewAllMeetings = async (req, res) => {
  try {
    const result = await meetingService.viewAllMeetings(
      req.body,
      req.query,
      req.userId,
      req.isMeetingOrganiser
    );
    console.log(result);
    if (result.totalCount == 0) {
      return Responses.failResponse(
        req,
        res,
        {
          totalCount: 0,
          meetingData: [],
        },
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    // errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VIEW SINGLE MEETING DETAILS**/
const viewMeeting = async (req, res) => {
  try {
    const result = await meetingService.viewMeeting(req.params.id);
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

/**FUNC- TO VIEW LIST ATTENDEES FROM PREVIOUS MEETING**/
const listAttendeesFromPreviousMeeting = async (req, res) => {
  try {
    const result = await meetingService.listAttendeesFromPreviousMeeting(
      req.params.organizationId,
      req.userId
    );
    console.log(result);
    if (result.length == 0) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
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

/**FUNC- TO VIEW LIST ATTENDEES FROM PREVIOUS MEETING**/
const viewMeetingActivities = async (req, res) => {
  try {
    const result = await meetingService.viewMeetingActivities(req.params.id);
    console.log(result);

    if (result.length == 0) {
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

/* GET MEETING CREATE STEP STATUS  */
const getCreateMeetingStep = async (req, res) => {
  try {
    const result = await meetingService.getCreateMeetingStep(
      req.params.organizationId,
      req.userId
    );
    console.log(result);

    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        200
      );
    }
    return Responses.successResponse(
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
  createMeeting,
  updateRsvp,
  cancelMeeting,
  updateMeeting,
  viewMeeting,
  viewAllMeetings,
  listAttendeesFromPreviousMeeting,
  viewMeetingActivities,
  getCreateMeetingStep,
};
