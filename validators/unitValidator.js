const Joi = require("joi");
const Responses = require("../helpers/response");

const createUnitValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
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
        .message({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      id: Joi.string().trim().alphanum().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createUnitValidator,
};
