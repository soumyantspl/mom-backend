const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const acceptOrRejectMinutesValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const enumValues = ["ACCEPTED", "REJECT", "PENDING"];
    const bodySchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      meetingId: Joi.string().trim().alphanum().required(),
      status: Joi.string()
        .valid(...enumValues)
        .required(),
    }).required();
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const createMinutesValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      //userId: Joi.string().trim().alphanum().required(),
  
      organizationId: Joi.string().trim().alphanum().required(),
      meetingId: Joi.string().trim().alphanum().required(),
      description: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }).required(),
      priority: Joi.string().required(),
      dueDate: Joi.date().min(new Date()).iso().required(),
      assignedUserId: Joi.string().trim().alphanum().required(),
      isAction: Joi.boolean().strict().required(),
      isNewUser: Joi.boolean().strict().required(),
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
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const downloadMinutesValidator = async (req, res, next) => {
  try {
    // const schema = Joi.object({
    //   meetingId: Joi.string().trim().alphanum().required(),
    // }).required();
    // await schema.validateAsync(req.body);
    const paramsSchema = Joi.object({
      meetingId: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
   // errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = { acceptOrRejectMinutesValidator, createMinutesValidator ,downloadMinutesValidator};
