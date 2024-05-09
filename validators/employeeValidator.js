const Joi = require("joi");
const Responses = require("../helpers/response");
// SEND VIEW EMPLOYEE VALIDATOR
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
// SEND CREATE EMPLOYEE VALIDATOR
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
      designationId: Joi.string().trim().alphanum().required(),
      organizationId: Joi.string().trim().alphanum().required(),
      departmentId: Joi.string().trim().alphanum().required(),
      unitId: Joi.string().trim().alphanum().required(),
      isMeetingOrganiser: Joi.boolean().strict(),
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

// SEND EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    // const headerSchema = Joi.object({
    //   headers: Joi.object({
    //     authorization: Joi.required(),
    //   }).unknown(true),
    // });
    const bodySchema = Joi.object({
      name: Joi.string().alphanum(),
      email: Joi.string().email(),
      designationId: Joi.string().trim().alphanum(),
      departmentId: Joi.string().trim().alphanum(),
      unitId: Joi.string().trim().alphanum(),
      isMeetingOrganiser: Joi.boolean().strict(),
      organizationId: Joi.string().trim().alphanum().required(),
      empId: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-_]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .strict(),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    // await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  viewEmployeeValidator, createEmployeeValidator, editEmployeeValidator
};
