const Minutes = require("../models/minutesModel");
const employeeService = require("./employeeService");
const { getAllAttendees } = require("./meetingService");
const acceptRejectMinutes = async (data) => {
  const result = await Minutes.findOneAndUpdate(
    {
      "attendees.id": data.userId,
      _id: data.id,
    },
    {
      $set: { "attendees.$.status": data.status },
    }
  );
  console.log(result);
  return result;
};

const createMinutes = async (data) => {
  let userId = data.userId;
  if (data.isNewUser) {
    const empData = await employeeService.createAttendee(
      data.name,
      data.email,
      data.organizationId
    );
    if (empData.isDuplicate) {
      return empData;
    }
    userId = empData._id;
  }
  //
  const attendeesData = await getAllAttendees(data.meetingId);
  const attendeeArr = JSON.stringify(attendeesData.attendees);
  console.log("Required data-->>", attendeeArr);
  const attendeeResult = JSON.parse(attendeeArr).map((item) => {
    console.log("---------------", item);
    item["status"] = "PENDING";
    return item;
  });
  console.log("attendeeResult-->", attendeeResult);
  const inputData = {
    createdById: userId,
    organisationId: data.organisationId,
    meetingId: data.meetingId,
    minutesDescription: data.minutesDescription,
    dueDate: data.dueDate,
    priority: data.priority,
    responsiblePerson: data.responsiblePerson,
    isAction: data.isAction,
    attendees: attendeeResult,
  };

  const minuteData = new Minutes(inputData);
  const newMinutes = await minuteData.save();

  return {
    data: newMinutes,
  };
};

module.exports = {
  acceptRejectMinutes,
  createMinutes,
};
