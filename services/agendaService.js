// const { Meeting } = require("../constants/logsConstants");
const Agenda = require("../models/agendaModel");
const ObjectId = require("mongoose").Types.ObjectId;


/**FUNC- TO CREATE AGENDA FOR MEETING**/
const createAgendaForMeeting = async (data) => {
  console.log("data--------------123", data);
  const inputData = data.map((item) => {
    item.timeLine = parseFloat(item.timeLine).toFixed(2);
    return item;
  });
  console.log("inputData-------------->>>>>>>>>>", inputData);
  const newAgenda = await Agenda.insertMany(inputData);
  console.log("newAgenda--------------", newAgenda);

  const agendaIds = newAgenda.map((item) => {
    return item._id;
  });
  console.log(agendaIds);
  console.log("newAgenda-------------22-", newAgenda);

  return agendaIds;
};

/**FUNC- TO VIEW ALL AGENDA WITH MINUTES OF SINGLE MEETING DETAILS**/
const viewAgendas = async (meetingId) => {
  console.log("meetingId", meetingId);
  const pipeLine = [
    {
      $match: {
        meetingId: new ObjectId(meetingId),
        //   isActive: true,
      },
    },
    {
      $lookup: {
        from: "meetings",
        localField: "meetingId",
        foreignField: "_id",
        as: "meetingDetail",
      },
    },
    {
      $unwind: {
        path: "$meetingDetail",
      },
    },

    {
      $lookup: {
        from: "minutes",
        localField: "_id",
        foreignField: "agendaId",
        as: "minutesDetail",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "minutesDetail.assignedUserId",
        foreignField: "_id",
        as: "assignedUserIdDetails",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        timeLine: 1,
        topic: 1,
        meetingDetail: {
          title: 1,
          _id: 1,
          attendees: 1,
          title: 1,
          mode: 1,
          link: 1,
          date: 1,
          fromTime: 1,
          toTime: 1,
          locationDetails: 1,
        },
        minutesDetail: {
          _id: 1,
          description: 1,
          isAction: 1,
          assignedUserId: 1,
          reassignedUserId: 1,
          dueDate: 1,
          isComplete: 1,
          priority: 1,
          amendmentDetails: 1,
          attendees: 1,
          createdById: 1,
        },
        assignedUserIdDetails:{
          _id:1,
          email:1,
          name:1
        }
      },
    },
  ];
  const meetingData = await Agenda.aggregate(pipeLine)
  //.limit(1);
  console.log("meetingData-----------", meetingData);
  if (meetingData.length !== 0) {
    const meetingDataObject = {
      agendaDetails: [],
    };
    meetingData.map((item) => {
      if (!meetingDataObject.meetingDetail) {
        meetingDataObject.meetingDetail = item.meetingDetail;
      }
      delete item.meetingDetail;
      meetingDataObject.agendaDetails.push(item);
    });

    console.log("meetingDataObject", meetingDataObject);
    return meetingDataObject;
  }
  return false;
};

module.exports = {
  createAgendaForMeeting,
  viewAgendas,
};
