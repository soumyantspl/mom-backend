const Rooms = require("../models/roomModel");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");

/**FUNC- CREATE ROOM */
const createRoom = async (userId, data, ipAddress = "1000") => {
  console.log("----------------------33333", data);
  const roomDetails = await checkDuplicateEntry(
    data.title,
    data.organizationId
  );
  console.log("roomDetails--------------", roomDetails);
  if (!roomDetails) {
    const inputData = {
      title: data.title,
      organizationId: data.organizationId,
      location: data.location,
    };
    const roomData = new Rooms(inputData);
    const result = await roomData.save();

    ////////////////////LOGER START
    console.log("result------------>", result);
    const logData = {
      moduleName: logMessages.Room.moduleName,
      userId,
      action: logMessages.Room.createRoom,
      ipAddress,
      details: "N/A",
      organizationId: result.organizationId,
    };
    console.log("logData-------------------", logData);
    await logService.createLog(logData);
    ///////////////////// LOGER END
    return result;
  }

  return false;
};

/**FUNC- TO VERIFY DUPLICATE ROOM */
const checkDuplicateEntry = async (title, organizationId) => {
  return await Rooms.findOne(
    { title, organizationId, isActive: true },
    { _id: 1, title: 1, organizationId: 1 }
  );
};

/**FUNC- EDIT ROOM */
const editRoom = async (userId, id, data, ipAddress = "1000") => {
  console.log("data.title------------->", data.title);
  const roomDetails = await checkDuplicateEntry(
    data.title,
    data.organizationId
  );
  console.log("roomDetails--------------", roomDetails);
  if (!roomDetails) {
    const result = await Rooms.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    console.log("room-----------------------", result);

    ////////////////////LOGER START
    const inputKeys = Object.keys(data);
    const details = await commonHelper.generateLogObject(
      inputKeys,
      result,
      userId,
      data
    );
    const logData = {
      moduleName: logMessages.Room.moduleName,
      userId,
      action: logMessages.Room.editRoom,
      ipAddress,
      details: details.join(" , "),
      organizationId: result.organizationId,
    };
    console.log("logData-------------------", logData);
    await logService.createLog(logData);
    ///////////////////// LOGER END

    return result;
  }
  return false;
};

/**FUNC- TO VIEW ROOMS */
const viewRoom = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId,
        title: { $regex: searchKey, $options: "i" },
        isActive: true,
      }
    : {
        organizationId,
        isActive: true,
      };

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Rooms.countDocuments(query);
  const roomsDatas = await Rooms.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return {
    totalCount,
    roomsDatas,
  };
};

/**FUNC- DELETE ROOM */
const deleteRoom = async (id) => {
  console.log("----------------------33333", id);
  const room = await Rooms.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
  console.log("room-----------------------", room);
  return room;
};

module.exports = {
  createRoom,
  editRoom,
  viewRoom,
  deleteRoom,
};
