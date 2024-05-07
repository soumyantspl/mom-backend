const designationService = require("../services/designationService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

const createDesignationController = async (req, res) => {
  try {
    const { name, organizationId } = req.body;
    const result = await designationService.createDesignationService(
      name,
      organizationId
    );
    return Responses.successResponse(
      req,
      res,
      result,
      messages.DesignationCreated,
      201
    );
  } catch (error) {
    console.log("controller error", error);
    return Responses.errorResponse(req, res, error);
  }
};

const editDesignationController = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await designationService.editDesignationService(id, name);
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
      messages.DesignationUpdated,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

const deleteDesignationController = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await designationService.deleteDesignationService(id);
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
      messages.DesignationDeleted,
      201
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};

const listDesignationController = async (req, res) => {
  try {
    const departments = await designationService.listDesignationService();
    return Responses.successResponse(
      req,
      res,
      departments,
      messages.DesignationList,
      200
    );
  } catch (error) {
    console.error("Controller error:", error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = {
  createDesignationController,
  editDesignationController,
  deleteDesignationController,
  listDesignationController
};
