const departmentServices = require("../services/departmentServices");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

const createDepartmentController = async (req, res) => {
  try {
    const { name, organizationId } = req.body;
    console.log(name,organizationId);
    const duplicateResult = await departmentServices.existingDepartmentService(
      organizationId
    );
    console.log("duplicateResult", duplicateResult);

    if (duplicateResult) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateDepartment,
        404
      );
    }
    const result = await departmentServices.createDepartmentService(
      name,
      organizationId
    );
    return Responses.successResponse(
      req,
      res,
      result,
      messages.DepartmentCreated,
      200
    );
  } catch (error) {
    console.log(error.message);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {createDepartmentController}
