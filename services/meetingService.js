const { find, findOne } = require("../models/agendaModel");
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
    mode: data.mode,
    link: data.link,
    date: new Date(data.date),
    organizationId: data.organizationId,
    locationDetails: data.locationDetails,
    step: 1,
  };
  const meetingData = new Meeting(inputData);
  const newMeeting = await meetingData.save();
  console.log("newMeeting----------------", newMeeting);

  return newMeeting;
  // }

  //return false;
};

const updateRsvp = async (data) => {
  const result = await Meeting.findOneAndUpdate(
    {
      "attendees.id": data.userId,
      _id: data.id,
    },
    {
      $set: { "attendees.$.rsvp": data.rsvp },
    }
  );
  console.log(result);
  return result;
};

const cancelMeeting = async (data) => {
  const remarks = data.remarks;
  console.log("remarks",remarks);
  const result = await Meeting.findOneAndUpdate(
    {
      _id: data.id,
    },
    {
      $set: {
        "meetingStatus.status": data.status,
        "meetingStatus.remarks": data.remarks,
      },
    }
  );
  console.log(result);
  return result;
};

module.exports = {
  createMeeting,
  updateRsvp,
  cancelMeeting,
};
