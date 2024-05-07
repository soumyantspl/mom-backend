const Joi = require("joi");
const Responses = require("../helpers/response");

const viewEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    // const bodySchema = Joi.object({
    //   name: Joi.string().required(),
    // });

    await headerSchema.validateAsync({ headers: req.headers });
   // await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  viewEmployeeValidator,
};
