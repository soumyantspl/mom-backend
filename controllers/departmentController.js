const departmentService = require("../services/departmentService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");
const createDepartmentController = async (req, res) => {
  try {
    const result = await departmentService.createDepartmentService(
      req.userId,
      req.body,
      req.ip
    );
    if (!result) {
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
      messages.departmentCreated,
      201
    );
  } catch (error) {
    console.log("controller error", error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const editDepartmentController = async (req, res) => {
  try {
    const result = await departmentService.editDepartmentService(
      req.userId,
      req.params.id,
      req.body,
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
      messages.departmentUpdated,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const deleteDepartmentController = async (req, res) => {
  try {
    const result = await departmentService.deleteDepartmentService(
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
      messages.departmentDeleted,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const listDepartmentController = async (req, res) => {
  try {
    const result = await departmentService.listDepartmentService(
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
        404
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
  createDepartmentController,
  editDepartmentController,
  deleteDepartmentController,
  listDepartmentController,
};
