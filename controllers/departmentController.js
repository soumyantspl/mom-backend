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
      201 
    );
  } catch (error) {
    console.log("controller error", error);
    return Responses.errorResponse(req, res, error);
  }
};

const editDepartmentController = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await departmentService.editDepartmentService(id, name);
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
      messages.DepartmentUpdated,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

const deleteDepartmentController = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const result = await departmentService.deleteDepartmentService(id);
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
      messages.DepartmentDeleted,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

const listDepartmentController = async (req, res) => {
  try {
    const departments = await departmentService.listDepartmentService();
    return Responses.successResponse(
      req,
      res,
      departments,
      messages.DepartmentList,
      200
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createDepartmentController,
  editDepartmentController,
  deleteDepartmentController,
  listDepartmentController,
};
