const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const actionCommentsValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      actionId: Joi.string().trim().alphanum().required(),
      userId: Joi.string().trim().alphanum().required(),
      commentDescription: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
    });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
// ACTION REASSIGN REQUEST VALIDATOR
const actionReassignRequestValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
        userId: Joi.string().required(),
        requestDetails: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
      })
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// VIEW SINGLE ACTION VALIDATOR
const viewSingleActionValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = { actionCommentsValidator,actionReassignRequestValidator,viewSingleActionValidator };
