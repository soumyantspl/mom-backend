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

const createEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    // const headerSchema = Joi.object({
    //   headers: Joi.object({
    //     authorization: Joi.required(),
    //   }).unknown(true),
    // });
    const bodySchema = Joi.object({
      name: Joi.string().alphanum().required(),
      email: Joi.string().email().required(),
      designationId:Joi.string().trim().alphanum().required(),
      organizationId: Joi.string().trim().alphanum().required(),
      departmentId: Joi.string().trim().alphanum().required(),
      unitId: Joi.string().trim().alphanum().required(),
      isMeetingOrganiser:Joi.boolean().strict(),
      empId: Joi.string()
      .trim()
      .pattern(/^[0-9a-zA-Z ,/-_]+$/)
      .messages({
        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
      })
      .strict(),
    });

   // await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};



module.exports = {
  viewEmployeeValidator,createEmployeeValidator
};
