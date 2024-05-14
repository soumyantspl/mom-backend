const { find, findOne } = require("../models/agendaModel");
const Meeting = require("../models/meetingModel");
const agendaService = require("./agendaService");
const logService=require("./logsService")
const logMessages=require("../constants/logsConstants")
/**FUNC- CREATE MEETING */
const createMeeting = async (data,userId,ipAddress) => {
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
    toTime: data.toTime,
    fromTime: data.fromTime,
  };
  const meetingData = new Meeting(inputData);
  const newMeeting = await meetingData.save();
  console.log("newMeeting----------------", newMeeting);
  const logData={
    moduleName:logMessages.Meeting.moduleName,
    userId:"6634ba12814c325112885ed3",
    action:logMessages.Meeting.createMeeting,
    ipAddress,
    details:logMessages.Meeting.createMeetingDetails,
    organizationId:data.organizationId
}
  await logService.createLog(logData)
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

    if (data.isNewPeople) {
      const empData = {
        email: data.email,
        name: data.name,
      };
      const newEmployee=await employeeService.createEmployee(empData);
    }

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
  if (data.step == 1) {
    updateData = data;
    if (data.date) {
      updateData.date = new Date(data.date);
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
  updateMeeting,
};
