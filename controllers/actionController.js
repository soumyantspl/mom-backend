const actionService = require("../services/actionService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");

const actionComments = async (req, res) => {
  try {
    const result = await actionService.comments(req.body);
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
const viewActionComment = async (req, res) => {
  try {
    const result = await acttionService.viewActionComment(req.body);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordNotFound,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO ACTION REASSIGN REQUEST**/
const actionReassignRequest = async (req, res) => {
  try {
    const result = await actionService.actionReassignRequest(
      req.body,
      req.params.id
    );
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

/**FUNC- TO REASSIGN ACTION **/
const reAssignAction = async (req, res) => {
  try {
    const result = await actionService.reAssignAction(req.body, req.params.id);
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
    if (result.isDuplicate) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEmail,
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
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VIEW SINGLE ACTION DETAILS**/
const viewSingleAction = async (req, res) => {
  try {
    const result = await actionService.viewSingleAction(req.params.id);
    console.log(result);
    if (result.length==0) {
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
      result[0],
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};


/**FUNC- TO VIEW ALL ACTIONS **/
const viewAllActions = async (req, res) => {
  try {
    const result = await actionService.viewAllAction(req.body,req.query);
    console.log(result);
    if (result.totalCount==0) {
      return Responses.failResponse(req, res, null, messages.recordsNotFound, 409);
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

/**FUNC- TO VIEW ALL ACTIONS **/
const viewUserAllActions = async (req, res) => {
  try {
    const result = await actionService.viewUserAllAction(req.body,req.query,req.userId);
    console.log(result);
    if (result.totalCount==0) {
      return Responses.failResponse(req, res, null, messages.recordsNotFound, 409);
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
  actionComments,
  actionReassignRequest,
  viewSingleAction,
  viewActionComment,
  reAssignAction,
  viewAllActions,
  viewUserAllActions
};
