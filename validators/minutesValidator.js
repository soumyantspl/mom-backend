const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const acceptOrRejectMinutesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      userId: Joi.string().trim().alphanum().required(),
      rsvp: Joi.string().required(),
    }).required();
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {acceptOrRejectMinutesValidator};
