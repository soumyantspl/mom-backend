const Rooms = require("../models/roomModel");

/**FUNC- CREATE ROOM */
const createRoom = async (data) => {
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
    const newRoom = await roomData.save();
    console.log("newRoom----------------", newRoom);

    return newRoom;
  }

  return false;
};

/**FUNC- TO VERIFY DUPLICATE ROOM */
const checkDuplicateEntry = async (title, organizationId) => {
  return await Rooms.findOne(
    { title, organizationId, isActive: true },
    { _id: 1, title: 1, organisationId: 1 }
  );
};

/**FUNC- EDIT ROOM */
const editRoom = async (data, id) => {
  console.log("----------------------3333344", data);
  console.log("----------------------33333", id);
  const room = await Rooms.findByIdAndUpdate({ _id: id }, data, { new: true });
  console.log("room-----------------------", room);
  return room;
};

module.exports = {
  createRoom,
  editRoom,
};
