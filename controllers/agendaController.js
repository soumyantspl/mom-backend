const agendaService = require("../services/agendaService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");
const createAgenda = async (req, res) => {
  try {
    const result = await agendaService.createAgendaForMeeting(req.body);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.createError, 409);
    }
    return Responses.successResponse(
      req,
      res,
      result.data,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VIEW ALL AGENDA WITH MINUTES OF SINGLE MEETING DETAILS**/
const viewAgendas = async (req, res) => {
  try {
    const result = await agendaService.viewAgendas(req.params.id);
    console.log('result---------------',result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.recordsNotFound,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      result,
      messages.recordsFound,
      200
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createAgenda,viewAgendas
};
