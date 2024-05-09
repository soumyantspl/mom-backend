const Meeting = require("../models/roomModel");

/**FUNC- CREATE MEETING */
const createMeeting = async (data) => {
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
    const meetingData = new Meeting(inputData);
    const newMeeting = await meetingData.save();
    console.log("newMeeting----------------", newMeeting);

    return newMeeting;
  }

  return false;
};

module.exports = {
    createMeeting
  };
