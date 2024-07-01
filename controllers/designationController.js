const designationService = require("../services/designationService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");

const createDesignationController = async (req, res) => {
  try {
    const result = await designationService.createDesignationService(
      req.userId,
      req.body,
      req.ip
    );
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEntry,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.designationCreated,
      201
    );
  } catch (error) {
    console.log("controller error", error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const editDesignationController = async (req, res) => {
  try {
    const result = await designationService.editDesignationService(
      req.userId,
      req.params.id,
      req.body,
      req.ip
    );
    if (result.isDuplicate) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateUnitEntry,
        200
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.designationUpdated,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const deleteDesignationController = async (req, res) => {
  try {
    const result = await designationService.deleteDesignationService(
      req.userId,
      req.params,
      req.ip
    );
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.idIsNotAvailabled,
        404
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.designationDeleted,
      202
    );
  } catch (error) {
    errorLog(error);
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

const listDesignationController = async (req, res) => {
  try {
    const result = await designationService.listDesignationService(
      req.body,
      req.query
    );
    console.log(result);
    if (result.totalCount == 0) {
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
module.exports = {
  createDesignationController,
  editDesignationController,
  deleteDesignationController,
  listDesignationController,
};
