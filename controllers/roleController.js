const roleService = require("../services/roleService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE NEW ROLE**/
const createRole = async (req, res) => {
    try {
      const result = await roleService.createRole(req.body);
      console.log(result);
      if (!result) {
        return Responses.failResponse(
          req,
          res,
          null,
          messages.duplicateEntry,
          409
        );
      }
     
      return Responses.successResponse(
        req,
        res,
        result,
        messages.createdSuccess,
        201
      );
    } catch (error) {
      console.log(error);
     // errorLog(error);
      return Responses.errorResponse(req, res, error);
    }
  };
/**FUNC- TO EDIT ROLE **/
const editRole = async (req, res) => {
    try {
      const result = await roleService.updateRole(req.body, req.params.id);
      console.log(result);
      if (!result) {
        return Responses.failResponse(req, res, null, messages.updateFailedRecordNotFound, 409);
      }
      if (result.isDuplicateName) {
        return Responses.failResponse(req, res, null, messages.duplicateName, 409);
      }
      return Responses.successResponse(
        req,
        res,
        result,
        messages.updateSuccess,
        200
      );
    } catch (error) {
      console.log(error);
      errorLog(error);
      return Responses.errorResponse(req, res, error);
    }
  };
  module.exports={
    createRole,editRole
  }
  