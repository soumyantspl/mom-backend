const Joi = require("joi");
const Responses = require("../helpers/response");

// CREATE ROLE VALIDATOR
const createRoleValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      organizationId: Joi.string().trim().alphanum().required(),
      permission: Joi.object({
        read: Joi.boolean().required(),
        write: Joi.boolean().required(),
        edit: Joi.boolean().required(),
      }).required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    // await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    // errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// EDIT ROLE VALIDATOR
const updateRoleValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      permission: Joi.object({
        read: Joi.boolean().required(),
        write: Joi.boolean().required(),
        edit: Joi.boolean().required(),
      }),
    });

    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    //   errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// VIEW ROLE VALIDATOR
const viewRoleValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    //   errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// DELETE ROLE VALIDATOR
const deleteRoleValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    //   errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createRoleValidator,
  updateRoleValidator,
  viewRoleValidator,
  deleteRoleValidator,
};
