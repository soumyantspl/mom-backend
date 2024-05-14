const { find, findOne } = require("../models/agendaModel");
const Meeting = require("../models/meetingModel");
const agendaService = require("./agendaService");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const ObjectId = require("mongoose").Types.ObjectId;
const emailService = require("./emailService");
const emailTemplates = require("../emailSetUp/emailTemplates");
const emailConstants = require("../constants/emailConstants");
/**FUNC- CREATE MEETING */
const createMeeting = async (data, userId, ipAddress) => {
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
  const logData = {
    moduleName: logMessages.Meeting.moduleName,
    userId: "6634ba12814c325112885ed3",
    action: logMessages.Meeting.createMeeting,
    ipAddress,
    details: logMessages.Meeting.createMeetingDetails,
    organizationId: data.organizationId,
  };
  await logService.createLog(logData);
  return newMeeting;
  // }

  //return false;
};

/**FUNC- UPDATE MEETING */
const updateMeeting = async (data, id) => {
  console.log("----------------------33333", data, id);
  let updateData = {};
  if (data.step == 2) {
    // CHECK IF NEW PEOPLE , IF THEN FIRST ADD THEM IN EMPLOYEED AND THEN ADD THEM IN ATTENDEES ARRAY

    if (data.isNewPeople) {
      const empData = {
        email: data.email,
        name: data.name,
      };
      const newEmployee = await employeeService.createEmployee(empData);
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
    const agendaIds = await agendaService.createAgendaForMeeting(newAgendaData);
    updateData.step = 3;
    updateData.agendaIds = agendaIds;
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

  const mailData = await emailTemplates.createMeeting("Updated");
  const emailSubject = emailConstants.updateMeetingSubject;
  await emailService.sendEmail(
    userData.email,
    emailType,
    emailSubject,
    mailData
  );
  return meeting;

  //return false;
};

/**FUNC- TO VIEW SINGLE MEETING DETAILS */
const viewMeeting = async (meetingId) => {
  console.log(meetingId);
  const meetingData = await Meeting.aggregate([
    {
      $match: {
        _id: new ObjectId(meetingId),
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "agendas",
        localField: "agendaIds",
        foreignField: "_id",
        as: "agendasDetail",
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
      $project: {
        _id: 1,
        attendees: 1,
        title: 1,
        mode: 1,
        link: 1,
        date: 1,
        fromTime: 1,
        toTime: 1,
        locationDetails: 1,
        agendasDetail: {
          title: 1,
          _id: 1,
          meetingId: 1,
          timeLine: 1,
        },
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
        },
      },
    },
  ]);
  if (meetingData.length !== 0) {
    let meetingDataObject = meetingData[0];
    meetingDataObject.attendees.map((item) => {
      console.log("item---------", item);
      const attendeeData = meetingDataObject.attendeesDetail.find(
        (attendee) => attendee._id == item.id.toString()
      );
      console.log("attendeeData---------", attendeeData);
      return (item.name = attendeeData.name);
    });
    delete meetingDataObject.attendeesDetail;

    console.log("meetingDataObject---------------", meetingDataObject);

    return meetingDataObject;
  }
  return false;
};

/**FUNC- TO VIEW ALL MEETING LIST */
const viewAllMeetings = async (bodyData, queryData, userId, roleType) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId: new ObjectId(organizationId),
        title: { $regex: searchKey, $options: "i" },
        isActive: true,
      }
    : {
        organizationId: new ObjectId(organizationId),
        isActive: true,
      };
  console.log("roleType---------", roleType);
  console.log("userId---------", userId);
  if (roleType == "USER") {
    query["attendees.id"] = new ObjectId(userId);
  }

  console.log("query", query);

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Meeting.countDocuments(query);

  const meetingData = await Meeting.aggregate([
    {
      $match: query,
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
      $project: {
        _id: 1,
        attendees: 1,
        title: 1,
        mode: 1,
        link: 1,
        date: 1,
        fromTime: 1,
        toTime: 1,
        locationDetails: 1,
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
        },
      },
    },
  ])
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);
  console.log("meetingData---------", meetingData);
  if (meetingData.length !== 0) {
    meetingData.map((meetingDataObject) => {
      console.log("meetingDataObject---------", meetingDataObject);
      meetingDataObject.attendees.map((item) => {
        console.log("item---------", item);
        console.log(
          "attendeesDetail----------",
          meetingDataObject.attendeesDetail
        );
        const attendeeData = meetingDataObject.attendeesDetail.find(
          (attendee) => attendee._id == item.id.toString()
        );
        console.log("attendeeData---------", attendeeData);
        if (item.id.toString() == userId) {
          meetingDataObject.rsvp = item.rsvp;
        }
        if (attendeeData) {
          return (item.name = attendeeData.name);
        }
      });
      delete meetingDataObject.attendeesDetail;

      meetingDataObject.userRsvp = console.log(
        "meetingDataObject---------------",
        meetingDataObject
      );
    });

    // return meetingDataObject;
  }
  return {
    totalCount,
    meetingData,
  };
};
/**FUNC- TO UPDATE RSVP SECTION */
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

/**FUNC- TO CANCEL MEETING */
const cancelMeeting = async (data) => {
  const remarks = data.remarks;
  console.log("remarks", remarks);
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

/**FUNC- TO VIEW LIST OF ATTENDEES FROM PREVIOUS MEETING */
const listAttendeesFromPreviousMeeting = async (data) => {
  const userId = data.userId;
  // query["attendees.id"] = new ObjectId(userId);

  console.log("userId---------", userId);

  const meetingData = await Meeting.aggregate([
    {
      $match: { "attendees.id": new ObjectId(data.id) },
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
      $project: {
        _id: 1,
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
        },
      },
    },
  ]);
  console.log("meetingData---------", meetingData);
  const data0 = meetingData.map((meeting) => {
    return meeting.attendeesDetail;
  });

  console.log("DATA-->", data0);
  const data1 = [].concat(...data0);
  console.log("DATA-->", data1);

  // function removeDuplicate(data) {
  //   return [...new Set(data)];
  // }

  const DATA = data1.filter((obj, index, self) =>
    index === self.findIndex((o) =>
      JSON.stringify(o) === JSON.stringify(obj)
    )
  );
  console.log("DATA---==", DATA);

  return {
    meetingData,
  };
};

module.exports = {
  createMeeting,
  updateRsvp,
  cancelMeeting,
  updateMeeting,
  viewMeeting,
  viewAllMeetings,
  listAttendeesFromPreviousMeeting,
};
