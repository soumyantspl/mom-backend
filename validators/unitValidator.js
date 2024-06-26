const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const createUnitValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodyschema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      address: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      organizationId: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await bodyschema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

const editUnitValidator = async (req, res, next) => {
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
        }),
      address: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      organizationId: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

const deleteUnitValidator = async (req, res, next) => {
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
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

const listUnitValidator = async (req, res, next) => {
  try {
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodyschema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      organizationId: Joi.string().trim().alphanum().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      order: Joi.number(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.query);
    await bodyschema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};
module.exports = {
  createUnitValidator,
  editUnitValidator,
  deleteUnitValidator,
  listUnitValidator,
};
