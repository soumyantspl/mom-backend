const Joi = require("joi");
const createDesignationSchema = Joi.object({
  name: Joi.string().required(),
  organisationId: Joi.string().required(),
});

const validateDesignation = (req, res, next) => {
  const { error } = createDesignationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateDesignation };
