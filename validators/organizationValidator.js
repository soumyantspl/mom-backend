const Joi = require("joi");
const { errorLog } = require("../middlewares/errorLog");
const Responses = require("../helpers/response");

exports.createOrganisationValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      details: Joi.string().alphanum().min(3).max(50),
      address: Joi.string().min(3).max(50),
      email: Joi.string().email().required(),
      phone: Joi.number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .required()
        .messages({
          "number.min": "Mobile number should be 10 digit",
          "number.max": "Mobile number should be 10 digit",
        }),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

exports.viewOrganizationValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

exports.editOrganizationValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      details: Joi.string().alphanum().min(3).max(50),
      address: Joi.string().min(3).max(50),
      email: Joi.string().email(),
      phone: Joi.number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .messages({
          "number.min": "Mobile number should be 10 digit",
          "number.max": "Mobile number should be 10 digit",
        }),
    });

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
