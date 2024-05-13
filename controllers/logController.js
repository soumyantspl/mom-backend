const logService = require("../services/logsService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO VIEW LOG LISTS**/
const viewLogs = async (req, res) => {
  try {
    const result = await logService.viewLogs(req.body, req.query);
    console.log(result);
    if (result.totalCount == 0) {
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
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  viewLogs,
};
