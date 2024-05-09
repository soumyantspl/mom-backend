const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const unitService = require("../services/unitService");

const createUnit = async (req, res) => {
  try {
    console.log("request body", req.body);
    const result = await unitService.createUnit(req.body);

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

const editUnit = async (req, res) => {
  try {
    console.log(req.body);
    // const { id, data } = req.body
    const result = await unitService.editUnit(req.body, req.params.id);
    // console.log("Query id", req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.invalidId, 409);
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.updateSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = { createUnit, editUnit };
