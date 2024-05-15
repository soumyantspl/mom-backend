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

// ACTION REASSIGN VALIDATOR
const reAssignActionValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      isNewUser: Joi.boolean().required(),
      name: Joi.when("isNewUser", {
        is: Joi.boolean().valid(true),
        then: Joi.string().alphanum().required(),
        otherwise: Joi.string().alphanum(),
      }),
      email: Joi.when("isNewUser", {
        is: Joi.boolean().valid(true),
        then: Joi.string().email().required(),
        otherwise: Joi.string().email(),
      }),
      organizationId: Joi.string().trim().alphanum().required(),
      reAssignReason: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      userId: Joi.when("isNewUser", {
        is: Joi.boolean().valid(false),
        then: Joi.string().alphanum().required(),
        otherwise: Joi.string().alphanum(),
      }),
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



// VIEW ALL ACTION LIST VALIDATOR
const viewAllActionsValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const schema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

      organizationId: Joi.string().trim().alphanum().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number().required(),
      page: Joi.number().required(),
      order: Joi.number().required(),
    });

    await paramsSchema.validateAsync(req.query);
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};



module.exports = {
  actionCommentsValidator,
  actionReassignRequestValidator,
  viewSingleActionValidator,
  reAssignActionValidator,viewAllActionsValidator
};
