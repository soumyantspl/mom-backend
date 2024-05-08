const Joi = require("joi");
const Responses = require("../helpers/response");

exports.createDesignationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  organizationId: Joi.string().required(),
});

exports.validateCreateDesignation = (req, res, next) => {
  const { error } = createDesignationSchema.validate(req.body);
  if (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
  next();
};

exports.editDesignationValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      id: Joi.string(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

exports.deleteDesignationValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

exports.listDesignationValidator = async (req, res, next) => {
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
      name: Joi.string().alphanum().min(3).max(30),
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
