// const { Meeting } = require("../constants/logsConstants");
const Agenda = require("../models/agendaModel");
const Meeting = require("../models/meetingModel");
const ObjectId = require("mongoose").Types.ObjectId;
const createAgendaForMeeting = async (data) => {
  console.log("data--------------123", data);
  const inputData = data.map((item) => {
    item.timeLine = parseFloat(item.timeLine).toFixed(2);
    return item;
  });
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


  const meetingData = await Agenda.aggregate([
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
        //   preserveNullAndEmptyArrays: true
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
      $project: {
        _id: 1,
        title: 1,
        // attendees: 1,
        // title: 1,
        // mode: 1,
        // link: 1,
        // date: 1,
        // fromTime: 1,
        // toTime: 1,
        // locationDetails: 1,
        meetingDetail: {
          title: 1,
          _id: 1,
        },
        minutesDetail: {
          _id: 1,
          description: 1,
        },
      },
    },
  ]).limit(3);
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
