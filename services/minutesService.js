const Minutes = require("../models/minutesModel");
const employeeService = require("./employeeService");
const { getAllAttendees } = require("./meetingService");
const { createMeetingActivities } = require("./meetingService");

//FUNCTION TO ACCEPT OR REJECT MINUTES
const acceptRejectMinutes = async (data, userId) => {
  const result = await Minutes.findOneAndUpdate(
    {
      "attendees.id": new ObjectId(userId),
      _id: new ObjectId(data.id),
    },
    {
      $set: { "attendees.$.status": data.status },
    }
  );
  console.log("RESULT DATA", result);
  const activityObject = {
    activityDetails: data.status,
    activityTitle:
      data.status == "ACCEPTED" ? "Minute accepted" : "Minute Rejected",
    meetingId: data.meetingId,
    userId,
  };
  console.log("activityObject-->", activityObject);
  const meetingActivitiesResult = await meetingActivities(activityObject);
  console.log("meetingActivities------------", meetingActivitiesResult);
  return result;
};

//FUNCTION RO CREATE MINUTES

const createMinutes = async (data, userId) => {
  if (data.isNewUser) {
    const empData = await employeeService.createAttendee(
      data.name,
      data.email,
      data.organizationId
    );
    if (empData.isDuplicate) {
      return empData;
    }
    userId = new ObjectId(empData._id);
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

  console.log("createdBy---", newMinutes.description);
  const activityObject = {
    activityDetails: newMinutes.description,
    activityTitle: "MINUTES CREATED",
    meetingId: data.meetingId,
    userId,
  };
  console.log("activityObject-->", activityObject);
  const meetingActivitiesResult = await createMeetingActivities(activityObject);
  console.log("meetingActivities------------", meetingActivitiesResult);

  return {
    data: newMinutes,
  };
};

//FUNCTION TO DOWNLOAD MINUTES
const downLoadMinutes= async (data) => {
 
  const minutesData = await Minutes.aggregate([
    {
      $match: {
        meetingId:new ObjectId(data.meetingId),
        isAction:false,

      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "attendees.id",
        foreignField: "_id",
        as: "attendeesDetail",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "createdById",
        foreignField: "_id",
        as: "createdByDetails",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "amendmentDetails.id",
        foreignField: "_id",
        as: "amendmentDetails",
      },
    },
    {
      $lookup: {
        from: "organization",
        localField: "organizationId",
        foreignField: "_id",
        as: "organizationDetail",
      },
    },
    {
      $project: {
        _id: 1,
        attendees: 1,
        title: 1,
        // mode: 1,
        // link: 1,
        // date: 1,
        // fromTime: 1,
        // toTime: 1,
       // locationDetails: 1,
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
        },
      },
    },
  ])
  console.log('minutesData--------------',minutesData)
  return minutesData;
};




module.exports = {
  acceptRejectMinutes,
  createMinutes,
  downLoadMinutes
};
