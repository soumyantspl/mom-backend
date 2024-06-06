const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");
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
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//CREATE EMPLOYEE VALIDATOR
const createEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
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

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
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
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

//DELETE EMPLOYEE VALIDATOR
const deleteEmployeValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await paramsSchema.validateAsync(req.params);
    await headerSchema.validateAsync({ headers: req.headers });
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);

    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

      organizationId: Joi.string().trim().alphanum().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      order: Joi.number(),
    });

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    await paramsSchema.validateAsync(req.query);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//VIEW EMPLOYEE VALIDATOR
const viewSingleEmployeeValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const masterDataValidator = async (req, res, next) => {
  try {
    console.log(req.params);
    const paramsSchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    });
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    // await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
module.exports = {
  viewEmployeeValidator,
  createEmployeeValidator,
  editEmployeeValidator,
  deleteEmployeValidator,
  listEmployesValidator,
  viewSingleEmployeeValidator,
  masterDataValidator,
};
