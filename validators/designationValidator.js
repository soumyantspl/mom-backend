const Joi = require("joi");
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
