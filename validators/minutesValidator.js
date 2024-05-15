const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const acceptOrRejectMinutesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      userId: Joi.string().trim().alphanum().required(),
      status: Joi.string().required(),
    }).required();
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const createMinutesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().trim().alphanum().required(),
      minutesDescription: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      priority: Joi.string().required(),
      dueDate: Joi.date().min(new Date()).iso().required(),
      responsiblePerson: Joi.string().trim().alphanum().required(),
      isAction: Joi.boolean().strict(),
    }).required();
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = { acceptOrRejectMinutesValidator, createMinutesValidator };
