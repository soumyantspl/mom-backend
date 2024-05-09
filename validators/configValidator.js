const Joi = require("joi");
const Responses = require("../helpers/response");

// CREATE CONFIGURATION VALIDATOR
const createConfigValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      acceptanceRejectionEndtime: Joi.number(),
      amendmentRequestTime: Joi.number(),
      mettingReminders: Joi.object({
        hours: Joi.number().required(),
        minutes: Joi.number().required(),
      }),
      chaseOfAction: Joi.number(),
      organizationId: Joi.string().trim().alphanum().required(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// UPDATE CONFIGURATION VALIDATOR
const updateConfigValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const schema = Joi.object({
      acceptanceRejectionEndtime: Joi.number(),
      amendmentRequestTime: Joi.number(),
      mettingReminders: Joi.object({
        hours: Joi.number().required(),
        minutes: Joi.number().required(),
      }),
      chaseOfAction: Joi.number(),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// VIEW CONFIGURATION VALIDATOR
const viewConfigValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const paramsSchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// DELETE CONFIGURATION VALIDATOR
const deleteConfigValidator = async (req, res, next) => {
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
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createConfigValidator,
  updateConfigValidator,
  viewConfigValidator,
  deleteConfigValidator,
};
