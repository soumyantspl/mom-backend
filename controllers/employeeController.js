const employeeService = require("../services/employeeService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE CONFIGURATION**/
const createEmployee = async (req, res) => {
  try {
    const result = await employeeService.createEmployee(req.body);
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
      messages.creatSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = { createEmployee };
