const Joi = require("joi");

exports.sendOtpValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  }
};
