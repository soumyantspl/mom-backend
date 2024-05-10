const Meeting = require("../models/meetingModel");

/**FUNC- CREATE MEETING */
const createMeeting = async (data) => {
//   console.log("----------------------33333", data);
//   const roomDetails = await checkDuplicateEntry(
//     data.title,
//     data.organizationId
//   );
//   console.log("roomDetails--------------", roomDetails);
 // if (!roomDetails) {
    const inputData = {
      title: data.title,
      mode:data.mode,
      link:data.link,
      date:new Date(data.date),
      organizationId: data.organizationId,
      locationDetails: data.locationDetails,
      step:1
    };
    const meetingData = new Meeting(inputData);
    const newMeeting = await meetingData.save();
    console.log("newMeeting----------------", newMeeting);

    return newMeeting;
 // }

  //return false;
};

module.exports = {
    createMeeting
  };
