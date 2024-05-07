const departmentService = require("../services/departmentService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

const createDepartmentController = async (req, res) => {
  try {
    const { name, organizationId } = req.body;

    const result = await departmentService.createDepartmentService(
      name,
      organizationId
    );
    return Responses.successResponse(
      req,
      res,
      result,
      messages.DepartmentCreated,
      200 //ok
    );
  } catch (error) {
    console.log("controller error", error);
    return Responses.errorResponse(req, res, error);
  }
};

const editDepartmentController = async (req, res) => {
  const { id, name } = req.body;
  try {
    const result = await departmentService.editDepartmentService(id, name);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.idIsNotAvailabled,
        404 // Not Found
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.DepartmentUpdated,
      200 // OK
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = { createDepartmentController, editDepartmentController };
