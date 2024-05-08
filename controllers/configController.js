const configService = require("../services/configService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE CONFIGURATION**/
const createConfig = async (req, res) => {
  try {
    const result = await configService.createConfig(req.body);
    console.log(result);
    // if (result?.isUpdated) {
    //   return Responses.failResponse(
    //     req,
    //     res,
    //     null,
    //     messages.duplicateEntry,
    //     409
    //   );
    // }
    if (result?.isUpdated) {
      return Responses.successResponse(
        req,
        res,
        null,
        messages.updateSuccess,
        201
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.creatSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO EDIT CONFIGURATION**/
const editConfig = async (req, res) => {
  try {
    const result = await configService.editConfig(req.body, req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.updateFailedRecordNotFound,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.updateSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO VIEW CONFIGURATION **/
const viewConfig = async (req, res) => {
  try {
    const result = await configService.viewConfig(req.params.organizationId);
    console.log(result);
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
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO DELETE CONFIGURATION **/
const deleteConfig = async (req, res) => {
  try {
    const result = await configService.deleteConfig(req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.deleteFailedRecordNotFound,
        409
      );
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.deleteSuccess,
      200
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createConfig,
  editConfig,
  viewConfig,
  deleteConfig,
};
