const Joi = require("joi");
const Responses = require("../helpers/response");

// const viewEmployeeValidator = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const schema = Joi.object({
//       email: Joi.string().email().required(),
//     });

//     await schema.validateAsync(req.body);
//     next();
//   } catch (error) {
//     console.log(error);
//     return Responses.errorResponse(req, res, error);
//   }
// };

const viewEmployeeValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
      body: Joi.object({
        name: Joi.string().required(),
      }),
    });
    await schema.validateAsync({ headers: req.headers},req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
   
  }
};

module.exports={
    viewEmployeeValidator
}