const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const acceptOrRejectMinutesValidator = async (req, res, next) => {
  try {
    const enumValues = ["ACCEPTED", "REJECT", "PENDING"];
    const schema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      status: Joi.string().required(),
      status: Joi.string()
        .valid(...enumValues)
        .required(),
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
      organisationId: Joi.string().trim().alphanum().required(),
      meetingId: Joi.string().trim().alphanum().required(),
      description: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      priority: Joi.string().required(),
      dueDate: Joi.date().min(new Date()).iso().required(),
      responsiblePerson: Joi.string().trim().alphanum().required(),
      isAction: Joi.boolean().strict(),
      isNewUser: Joi.boolean().strict(),
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
