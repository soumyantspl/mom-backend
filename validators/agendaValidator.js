const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

const createAgendaValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
      meetingId: Joi.string().trim().alphanum(),
      title: Joi.string().required(),
      topic: Joi.string(),
      timeLine: Joi.number().required(),
    });
    // await headerSchema.validateAsync({ headers: req.headers });
    // await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createAgendaValidator,
};
