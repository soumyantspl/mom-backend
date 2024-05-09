const Joi = require("joi");
const Responses = require("../helpers/response");

// CREATE ROOM VALIDATOR
const createRoomValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      title: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      location: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .strict(),
      organizationId: Joi.string().trim().alphanum().required(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// EDIT ROOM VALIDATOR
const editRoomValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const bodySchema = Joi.object({
      title: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

      location: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .strict(),
    });

    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// VIEW ROOM VALIDATOR
const viewRoomValidator = async (req, res, next) => {
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
    return Responses.errorResponse(req, res, error);
  }
};

// DELETE ROOM VALIDATOR
const deleteRoomValidator = async (req, res, next) => {
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
  createRoomValidator,
  editRoomValidator,
  viewRoomValidator,
  deleteRoomValidator,
};
