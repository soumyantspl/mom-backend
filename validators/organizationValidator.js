const Joi = require("joi");

exports.createOrganisationValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      details: Joi.string().alphanum().min(3).max(50),
      address: Joi.string().min(3).max(50),
      email: Joi.string().email().required(),
      phone: Joi.number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .required()
        .messages({
          "number.min": "Mobile number should be 10 digit",
          "number.max": "Mobile number should be 10 digit",
        }),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

// exports.viewOrganizationValidator = async(req,res,next) => {
//   try {
//     const schema = Joi.object({
//       name: Joi.string().alphanum().min(3).max(30),
//       details: Joi.string().alphanum().min(3).max(50),
//       address: Joi.string().min(3).max(50),
//       email: Joi.string().email(),
//       phone: Joi.number()
//         .integer()
//         .min(10 ** 9)
//         .max(10 ** 10 - 1)
//         .messages({
//           "number.min": "Mobile number should be 10 digit",
//           "number.max": "Mobile number should be 10 digit",
//         }),
//     });
//     await schema.validateAsync(req.body);
//     next();
//   } catch (error) {
//      console.log(error);
// return Responses.errorResponse(req, res, error);
//   }
// };

exports.editOrganizationValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      details: Joi.string().alphanum().min(3).max(50),
      address: Joi.string().min(3).max(50),
      email: Joi.string().email(),
      phone: Joi.number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .messages({
          "number.min": "Mobile number should be 10 digit",
          "number.max": "Mobile number should be 10 digit",
        }),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};
