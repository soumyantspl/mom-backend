const Meeting = require("../models/meetingModel");
const Agenda = require("../models/agendaModel");
const MeetingActivities = require("../models/meetingActivitiesModel");
const agendaService = require("./agendaService");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const ObjectId = require("mongoose").Types.ObjectId;
const emailService = require("./emailService");
const emailTemplates = require("../emailSetUp/emailTemplates");
const emailConstants = require("../constants/emailConstants");
const commonHelper = require("../helpers/commonHelper");
const employeeService = require("./employeeService");
/**FUNC- CREATE MEETING */
const createMeeting = async (data, userId, ipAddress, email) => {
  console.log("----------------------33333", data);
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
    createdById: new ObjectId(userId),
  };

  const meetingData = new Meeting(inputData);
  const newMeeting = await meetingData.save();
  console.log("newMeeting----------------", newMeeting);

  // if (data.sendNotification) {
  //   const mailData = await emailTemplates.createMeeting("Created");
  //   const emailSubject = emailConstants.createMeetingSubject;
  //   await emailService.sendEmail(
  //     email,
  //     "Create Meeting",
  //     emailSubject,
  //     mailData
  //   );
  // }

  ////////////////////LOGER START

  const logData = {
    moduleName: logMessages.Meeting.moduleName,
    userId,
    action: logMessages.Meeting.createMeeting,
    ipAddress,
    details: logMessages.Meeting.createMeetingDetails,
    organizationId: data.organizationId,
  };
  await logService.createLog(logData);

  ///////////////////// LOGER END

  return newMeeting;
};

/**FUNC- UPDATE MEETING */
const updateMeeting = async (data, id, userId, ipAddress) => {
  console.log("----------------------33333", data, id);
  let updateData = {};
  let mergedData = [];
  if (data.step == 2) {
    const newPeopleArray = data.attendees
      .filter((item) => item.isEmployee === false && item._id === undefined)
      .map((item) => {
        item.organizationId = data.organizationId;
        return item;
      });
    console.log("newPeopleArrya---------------", newPeopleArray);
    if (newPeopleArray.length !== 0) {
      const newEmployee = await employeeService.createAttendees(newPeopleArray);
      console.log("newEmployee--------", newEmployee);
      console.log("merge test------", [...data.attendees, ...newEmployee]);
      mergedData = [...data.attendees, ...newEmployee]
        .filter((item) => item._id !== undefined)
        .map((item) => {
          console.log("id---------", item);

          return { _id: item._id };
        });
      console.log("mergedData", mergedData);
    }
    // CHECK IF NEW PEOPLE , IF THEN FIRST ADD THEM IN EMPLOYEED AND THEN ADD THEM IN ATTENDEES ARRAY
    // PENDING
    // if (data.isNewPeople) {
    //   const empData = {
    //     email: data.email,
    //     name: data.name,
    //   };
    //   const newEmployee = await employeeService.createEmployee(empData);
    // }
    console.log("mergedData", mergedData);
    updateData = {
      attendees: mergedData.length !== 0 ? mergedData : data.attendees,
      // $addToSet: {  attendees: mergedData.length !== 0 ? mergedData : data.attendees} ,
      step: data.step,
    };
    if (data.isUpdate) {
      delete updateData.step;
    }
  }

  if (data.step == 3) {
    data.meetingId = id;
    await Agenda.deleteMany({ meetingId: id });
    const newAgendaData = data.agendas.map((item) => {
      (item.meetingId = id), (item.organizationId = data.organizationId);
      return item;
    });
    console.log("newAgendaData---------------", newAgendaData);
    const agendaIds = await agendaService.createAgendaForMeeting(newAgendaData);
    // updateData.step = 3;
    // updateData.agendaIds = agendaIds;
    updateData = {
      agendaIds,
      step: data.step,
      "meetingStatus.status": data.meetingStatus,
    };
    if (data.isUpdate) {
      delete updateData.step;
    }
  }

  if (data.step == 1) {
    updateData = data;
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    delete updateData.step;
  }
  console.log("----------------------updateData", updateData);
  const meeting = await Meeting.findByIdAndUpdate({ _id: id }, updateData, {
    new: false,
  });
  console.log("meeting-----------------------", meeting);
  if (data.sendNotification) {
    const meetingDetails = await viewMeeting(id);
    console.log("meetingDetails-------------------------", meetingDetails);
    if (meetingDetails?.attendees?.length !== 0) {
      meetingDetails?.attendees?.map(async (attendee) => {
        const logo =
          "https://d3uom8aq23ax4d.cloudfront.net/wp-content/themes/ntspl-corporate-website/images/ntspl_logo.png";
        const mailData = await emailTemplates.sendScheduledMeetingEmailTemplate(
          meetingDetails,
          attendee.name,
          logo
        );

        const emailSubject = await emailConstants.scheduleMeetingSubject(
          meetingDetails
        );
        console.log(
          "sendOtpEmailTemplate-----------------------maildata",
          mailData
        );
        console.log(
          "sendOtpEmailTemplate-----------------------emailSubject",
          emailSubject
        );
        await emailService.sendEmail(
          attendee.email,
          "Meeting Created",
          emailSubject,
          mailData
        );
      });
    }
  }

  ////////////////////LOGER START

  // const logData = {
  //   moduleName: logMessages.Meeting.moduleName,
  //   userId,
  //   action: logMessages.Meeting.updateMeeting,
  //   ipAddress,
  //   details: details.join(" , "),
  //   organizationId: data.organizationId,
  // };
  // await logService.createLog(logData);
  /////////////////////LOGER END
  return meeting;
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
        localField: "attendees._id",
        foreignField: "_id",
        as: "attendeesDetail",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "createdById",
        foreignField: "_id",
        as: "createdByDetail",
      },
    },
    {
      $lookup: {
        from: "meetingrooms",
        localField: "locationDetails.roomId",
        foreignField: "_id",
        as: "roomDetail",
      },
    },
    {
      $project: {
        _id: 1,
        createdBy: 1,
        attendees: 1,
        title: 1,
        mode: 1,
        link: 1,
        date: 1,
        fromTime: 1,
        toTime: 1,
        step: 1,
        meetingStatus: 1,
        locationDetails: 1,
        agendasDetail: {
          title: 1,
          _id: 1,
          meetingId: 1,
          timeLine: 1,
          topic: 1,
        },
        attendeesDetail: {
          _id: 1,
          name: 1,
          isEmployee: 1,
          email: 1,
        },
        roomDetail: {
          title: 1,
          _id: 1,
          location: 1,
        },
        createdByDetail: {
          _id: 1,
          email: 1,
          name: 1,
        },
      },
    },
    { $unwind: "$createdByDetail" },
    // { $unwind: "$roomDetail" },
  ]);
  console.log(meetingData);
  console.log(meetingData[0].attendeesDetail);
  if (meetingData.length !== 0) {
    let meetingDataObject = meetingData[0];
    meetingDataObject.attendees.map((item) => {
      console.log("item---------", item);
      const attendeeData = meetingDataObject.attendeesDetail.find(
        (attendee) => attendee._id == item._id.toString()
      );
      console.log("attendeeData---------", attendeeData);
      item.name = attendeeData.name;
      item.email = attendeeData.email;
      item.isEmployee = attendeeData.isEmployee;

      return item;
    });
    delete meetingDataObject.attendeesDetail;

    console.log("meetingDataObject---------------", meetingDataObject);

    return meetingDataObject;
  }
  return false;
};

/**FUNC- TO VIEW ALL MEETING LIST */
const viewAllMeetings = async (
  bodyData,
  queryData,
  userId,
  isMeetingOrganiser
) => {
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

  if (bodyData.fromDate && bodyData.toDate) {
    const fromDate = new Date(bodyData.fromDate);
    const toDate = new Date(bodyData.toDate);
    query.date = {
      $gte: new Date(fromDate.setDate(fromDate.getDate() - 1)),
      $lt: new Date(toDate.setDate(toDate.getDate() + 1)),
    };
  }

  console.log("isMeetingOrganiser---------", isMeetingOrganiser);
  console.log("userId---------", userId);
  if (!isMeetingOrganiser) {
    // query["attendees.id"] = new ObjectId(userId);
    query["$or"] = [
      { "attendees.id": new ObjectId(userId) },
      { createdById: new ObjectId(userId) },
    ];
  }
  if (bodyData.attendeeId) {
    query["attendees.id"] = new ObjectId(bodyData.attendeeId);
  }
  if (bodyData.meetingStatus) {
    query["meetingStatus.status"] = bodyData.meetingStatus;
  }
  console.log("query------------------------>>>>>>>>>>>>>>>>>>>>>", query);

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
        localField: "attendees._id",
        foreignField: "_id",
        as: "attendeesDetail",
      },
    },
    {
      $lookup: {
        from: "minutes",
        localField: "_id",
        foreignField: "meetingId",
        as: "actionDetail",
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
        status: 1,
        locationDetails: 1,
        meetingStatus: 1,
        createdAt: 1,
        actionDetail: {
          _id: 1,
          meetingId: 1,
          isComplete: 1,
          assignedUserId: 1,
          isAction: 1,
        },
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
        },
      },
    },
  ])
    .sort({ _id: parseInt(order) })
    .skip(skip)
    .limit(limit);

  console.log("meetingData---------", meetingData);
  if (meetingData.length !== 0) {
    meetingData.map((meetingDataObject) => {
      //  console.log("meetingDataObject---------", meetingDataObject);
      meetingDataObject.attendees.map((item) => {
        console.log("item---------", item);
        // console.log(
        //   "attendeesDetail----------",
        //   meetingDataObject.attendeesDetail
        // );
        const attendeeData = meetingDataObject.attendeesDetail.find(
          (attendee) => attendee._id == item._id.toString()
        );
        //  console.log("attendeeData---------", attendeeData);
        if (item._id.toString() == userId) {
          meetingDataObject.rsvp = item.rsvp;
        }
        if (attendeeData) {
          item.email = attendeeData.email;
          item.name = attendeeData.name;
          return;
        }
      });

      const actionData = meetingDataObject.actionDetail.filter(
        (action) => action.assignedUserId == userId && action.isAction == true
      );
      if (actionData.length !== 0) {
        meetingDataObject.actionDetail = actionData;
      }

      // console.log(
      //   "=================================================>>>>>",
      //   actionData
      // );
      delete meetingDataObject.attendeesDetail;

      // meetingDataObject.userRsvp = console.log(
      //   "meetingDataObject---------------",
      //   meetingDataObject
      // );
    });

    // return meetingDataObject;
  }

  return {
    totalCount,
    meetingData,
  };
};

/**FUNC- TO UPDATE RSVP SECTION */
const updateRsvp = async (id, userId, data, ipAddress = "1000") => {
  console.log("data----------------------------", data, id, userId);
  const result = await Meeting.findOneAndUpdate(
    {
      "attendees._id": new ObjectId(userId),
      _id: new ObjectId(id),
    },
    {
      $set: { "attendees.$.rsvp": data.rsvp },
    }
  );
  console.log("result-------------123", result);
  const inputKeys = Object.keys(data);
  console.log("inputKeys---------------", inputKeys);

  // ////////////////////LOGER START
  // const details = await commonHelper.generateLogObject(
  //   inputKeys,
  //   result,
  //   userId,
  //   data
  // );
  // console.log("details------>>>", details);
  // const logData = {
  //   moduleName: logMessages.Meeting.moduleName,
  //   userId,
  //   action: logMessages.Meeting.updateRSVP,
  //   ipAddress,
  //   details: details.join(" , "),
  //   organizationId: result.organizationId,
  // };
  // console.log("logData--->", logData);
  // await logService.createLog(logData);
  ///////////////////// LOGER END
  return result;
};

/**FUNC- TO CANCEL MEETING */
const cancelMeeting = async (id, userId, data, ipAddress) => {
  console.log("cancel meeting------------------------------------------");
  const result = await Meeting.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        "meetingStatus.status": "cancelled",
        "meetingStatus.remarks": data.remarks,
      },
    }
  );
  console.log("result", result);
  console.log("remarks ", data.remarks);

  const meetingDetails = await viewMeeting(id);
  console.log("meetingDetails-------------------------", meetingDetails);
  if (meetingDetails?.attendees?.length !== 0) {
    meetingDetails?.attendees?.map(async (attendee) => {
      //  console.log("attendeesEmails-------------------------", attendeesEmails);

      const logo =
        "https://d3uom8aq23ax4d.cloudfront.net/wp-content/themes/ntspl-corporate-website/images/ntspl_logo.png";
      const mailData = await emailTemplates.sendCancelMeetingEmailTemplate(
        meetingDetails,
        attendee.name,
        logo
      );
      //const mailData = await emailTemplates.signInByOtpEmail(userData, data.otp);
      const emailSubject = await emailConstants.cancelMeetingSubject(
        meetingDetails
      );
      console.log(
        "sendOtpEmailTemplate-----------------------maildata",
        mailData
      );
      console.log(
        "sendOtpEmailTemplate-----------------------emailSubject",
        emailSubject
      );
      await emailService.sendEmail(
        attendee.email,
        "Cancel Meeting",
        emailSubject,
        mailData
      );
    });
  }

  const logData = {
    moduleName: logMessages.Meeting.moduleName,
    userId,
    action: logMessages.Meeting.cancelMeeting,
    ipAddress,
    details: data.remarks,
    organizationId: result.organizationId,
  };
  console.log("logData--->", logData);
  await logService.createLog(logData);
  ///////////////////// LOGER END

  return result;
};

// /**FUNC- TO VIEW LIST OF ATTENDEES FROM PREVIOUS MEETING */
const listAttendeesFromPreviousMeeting = async (organizationId, userId) => {
  const meetingData = await Meeting.aggregate([
    {
      $match: {
        // "attendees.id": new ObjectId(userId),
        organizationId: new ObjectId(organizationId),
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "attendees._id",
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
          isEmployee: 1,
        },
      },
    },
  ]);
  const attendeeData = meetingData.map((meeting) => {
    return meeting.attendeesDetail;
  });
  console.log(attendeeData);
  const uniqueAttendeeData = [].concat(...attendeeData);
  const filetrData = uniqueAttendeeData.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj))
  );
  console.log("DATA---==", filetrData);
  return filetrData;
};

//FUNCTION TO GET ATTENDEES//
const getAllAttendees = async (meetingId) => {
  const result = await Meeting.findById(meetingId, { "attendees.id": 1 });
  return result;
  // const result =await Meeting.aggregate([
  //   {
  //     $match: {
  //      // "attendees.id": new ObjectId(userId),
  //       _id: new ObjectId(meetingId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "employees",
  //       localField: "attendees._id",
  //       foreignField: "_id",
  //       as: "attendeesDetail",
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       attendeesDetail: {
  //         email: 1,
  //         _id: 1,
  //         name: 1,
  //         isEmployee:1
  //       },
  //     },
  //   },
  // ]);
  // console.log("result---------------abc",result)
  // return result[0].attendeesDetail;
};

//FUNCTION TO STORE MEETING ACTIVITES
const createMeetingActivities = async (data, userId) => {
  const inputData = {
    activityDetails: data.activityDetails,
    meetingId: data.meetingId,
    userId,
    activityTitle: data.activityTitle,
  };
  console.log("inputData-----------------", inputData);

  const meetingActivitiesData = new MeetingActivities(inputData);
  const newMeetingActivities = await meetingActivitiesData.save();
  return newMeetingActivities;
};

//FUNCTION TO FETCH MEETING ACTIVITIES LIST
const viewMeetingActivities = async (id) => {
  const result = await MeetingActivities.find({ meetingId: id });
  console.log(result);
  return result;
};

//FUNCTION TO GET MEETING CREATE STEP STATUS
const getCreateMeetingStep = async (organizationId, userId) => {
  // const result = await Meeting.findOne(
  //   {
  //     createdById: new ObjectId(userId),
  //     organizationId: new ObjectId(organizationId),
  //     isActive: true,
  //     $or: [{ step: 1 }, { step: 2 }],
  //   }
  //   // { step: 1, _id: 1, createdAt: 1 }
  // ).sort({ createdAt: -1 });
  // return result;

  const meetingData = await Meeting.aggregate([
    {
      $match: {
        createdById: new ObjectId(userId),
        organizationId: new ObjectId(organizationId),
        isActive: true,
        $or: [{ step: 1 }, { step: 2 }],
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
        localField: "attendees._id",
        foreignField: "_id",
        as: "attendeesDetail",
      },
    },
    {
      $lookup: {
        from: "meetingrooms",
        localField: "locationDetails.roomId",
        foreignField: "_id",
        as: "roomDetail",
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
        step: 1,
        locationDetails: 1,
        meetingStatus: 1,
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
          isEmployee: 1,
        },
        roomDetail: {
          title: 1,
          _id: 1,
          location: 1,
        },
      },
    },
    // { $unwind: "$roomDetail" },
  ]).sort({ _id: -1 });
  console.log(meetingData);

  if (meetingData.length !== 0) {
    console.log("----------", meetingData[0].attendeesDetail);
    let meetingDataObject = meetingData[0];
    meetingDataObject.attendees.map((item) => {
      console.log("item---------", item);
      const attendeeData = meetingDataObject.attendeesDetail.find(
        (attendee) => attendee._id == item._id.toString()
      );
      console.log("attendeeData---------", attendeeData);
      item.name = attendeeData.name;
      item.email = attendeeData.email;
      item.isEmployee = attendeeData.isEmployee;

      return item;
      // return (item.name = attendeeData.name);
    });
    delete meetingDataObject.attendeesDetail;

    console.log("meetingDataObject---------------", meetingDataObject);

    return meetingDataObject;
  }
  return false;
};

module.exports = {
  createMeeting,
  updateRsvp,
  cancelMeeting,
  updateMeeting,
  viewMeeting,
  viewAllMeetings,
  listAttendeesFromPreviousMeeting,
  getAllAttendees,
  createMeetingActivities,
  viewMeetingActivities,
  getCreateMeetingStep,
};
