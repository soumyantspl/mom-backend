const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const unitService = require("../services/unitService");

const createUnitController = async (req, res) => {
  try {
    const result = await unitService.createUnit(req.body);
    console.log("request body", req.body);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateEntry,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.creatSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = { createUnitController };
