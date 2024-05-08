const roomService = require("../services/roomService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

/**FUNC- TO CREATE NEW MEETING ROOM**/
const createRoom = async (req, res) => {
  try {
    const result = await roomService.createRoom(req.body);
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
      null,
      messages.creatSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO EDIT MEETING ROOM**/
const editRoom = async (req, res) => {
  try {
    const result = await roomService.editRoom(req.body, req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.invalidId, 409);
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

module.exports = {
  createRoom,
  editRoom,
};
