const Meeting = require("../models/meetingModel");
const agendaService = require("../services/agendaService");
/**FUNC- CREATE MEETING */
const createMeeting = async (data) => {
  console.log("----------------------33333", data);
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
    toTime:data.toTime,
    fromTime:data.fromTime
  };
  const meetingData = new Meeting(inputData);
  const newMeeting = await meetingData.save();
  console.log("newMeeting----------------", newMeeting);

  return newMeeting;
  // }

  //return false;
};

/**FUNC- UPDATE MEETING */
const updateMeeting = async (data, id) => {
  console.log("----------------------33333", data, id);
  let updateData = {};
  if (data.step == 2) {

// CHECK IF NEW PEOPLE , IF THEN FIRST ADD THEN IN EMPLOYEED AND THEN ADD THEM IN ATTENDEES ARRAY

    updateData = {
      attendees: data.attendees,
      step: 2,
    };
  }

  if (data.step == 3) {
    data.meetingId = id;
    const newAgendaData = data.agendas.map((item) => {
      (item.meetingId = id), (item.organizationId = data.organizationId);
      return item;
    });
    console.log("newAgendaData---------------", newAgendaData);
    await agendaService.createAgenda(newAgendaData);
    updateData.step = 3;
  }

  //   const roomDetails = await checkDuplicateEntry(
  //     data.title,
  //     data.organizationId
  //   );
  //   console.log("roomDetails--------------", roomDetails);
  // if (!roomDetails) {
  if (data.step==1) {
    updateData = data
    if(data.date){
      updateData.date=new Date(data.date)
    }
  }
  console.log("----------------------updateData", updateData);
  const meeting = await Meeting.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  console.log("meeting-----------------------", meeting);

  return meeting;

  //return false;
};

module.exports = {
  createMeeting,
  updateMeeting,
};
