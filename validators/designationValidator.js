const Joi = require("joi");
const createDesignationSchema = Joi.object({
  name: Joi.string().required(),
  organizationId: Joi.string().required(),
});

exports.validateCreateDesignation = (req, res, next) => {
  const { error } = createDesignationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
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
    return res.status(400).json({ error: error.message });
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
    return res.status(400).json({ error: error.message });
  }
};
