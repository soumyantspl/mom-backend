const roomService = require("../services/roomService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");
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
      result,
      messages.createdSuccess,
      201
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

/**FUNC- TO EDIT MEETING ROOM**/
const editRoom = async (req, res) => {
  try {
    const result = await roomService.editRoom(req.body, req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.updateFailedRecordNotFound, 409);
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



/**FUNC- TO VIEW MEETING ROOM**/
const viewRooms = async (req, res) => {
  try {
    const result = await roomService.viewRoom(req.body,req.query);
    console.log(result);
    if (result.totalCount==0) {
      return Responses.failResponse(req, res, null, messages.recordsNotFound, 409);
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

/**FUNC- TO DELETE MEETING ROOM**/
const deleteRoom = async (req, res) => {
  try {
    const result = await roomService.deleteRoom(req.params.id);
    console.log(result);
    if (!result) {
      return Responses.failResponse(req, res, null, messages.deleteFailedRecordNotFound, 409);
    }
    return Responses.successResponse(
      req,
      res,
      null,
      messages.deleteSuccess,
      202
    );
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createRoom,
  editRoom,
  viewRooms,
  deleteRoom
};
