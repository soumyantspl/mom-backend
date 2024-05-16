const Minutes = require("../models/minutesModel");
const employeeService = require("./employeeService");
const { getAllAttendees } = require("./meetingService");
const { meetingActivities } = require("./meetingService");

const acceptRejectMinutes = async (data) => {
  const result = await Minutes.findOneAndUpdate(
    {
      "attendees.id": "663dbb0bcf8ec14b66687081",
      _id: data.id,
    },
    {
      $set: { "attendees.$.status": data.status },
    }
  );
  console.log("RESULT DATA", result);
  // 663dbb0bcf8ec14b66687084
  const activityObject = {
    activitiesDetails: data.status,
  };
  console.log("activityObject-->", activityObject);
  const meetingActivitiesResult = await meetingActivities(activityObject);
  return result;
};

const createMinutes = async (data) => {
  let userId = "663dbc52c6d385847217c4b0";
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
    description: data.description,
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
