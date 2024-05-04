const Joi = require("joi");
const Responses = require("../helpers/response");

const sendOtpValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  sendOtpValidator,
};
