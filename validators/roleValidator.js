const Joi = require("joi");
const Responses = require("../helpers/response");

// CREATE ROLE VALIDATOR
const createRoleValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      organizationId: Joi.string().trim().alphanum().required(),
      permission: Joi.object({
        read: Joi.boolean().required(),
        write: Joi.boolean().required(),
        edit: Joi.boolean().required(),
      }).required(),
    });
    // await headerSchema.validateAsync({ headers: req.headers });
    // await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    // errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// EDIT ROLE VALIDATOR
const updateRoleValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const bodySchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      permission: Joi.object({
        read: Joi.boolean().required(),
        write: Joi.boolean().required(),
        edit: Joi.boolean().required(),
      }),
    });

    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    //   errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createRoleValidator,
  updateRoleValidator,
};



// {
//     "_id": {
//       "$oid": "6645e0b870a089d7c1aede54"
//     },
//     "name": "ABC1",
//     "organizationId": {
//       "$oid": "6634ba12814c325112885ed3"
//     },
//     "isActive": true,
//     "permission": {
//       "read": true,
//       "write": false,
//       "edit": true
//     },
//     "createdAt": {
//       "$date": "2024-05-16T10:32:24.224Z"
//     },
//     "updatedAt": {
//       "$date": "2024-05-16T11:13:34.483Z"
//     },
//     "__v": 0
//   }