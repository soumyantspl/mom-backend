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
      $lookup: {
        from: "employees",
        localField: "meetingDetail.attendees._id",
        foreignField: "_id",
        as: "attendeesDetail",
      },
    },
    // {
    //   $lookup: {
    //     from: "employees",
    //     localField: "organizationId",
    //     foreignField: "organizationId",
    //     as: "employeesDetail",
    //   },
    // },
    {
      $lookup: {
        from: "meetingrooms",
        localField: "meetingDetail.locationDetails.roomId",
        foreignField: "_id",
        as: "roomDetail",
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
        assignedUserIdDetails: {
          _id: 1,
          email: 1,
          name: 1,
        },
        attendeesDetail: {
          email: 1,
          _id: 1,
          name: 1,
          isEmployee: 1,
        },
        // employeesDetail: {
        //   email: 1,
        //   _id: 1,
        //   name: 1,
        //   isEmployee: 1,
        // },
        roomDetail: {
          title: 1,
          _id: 1,
          location: 1,
        },
      },
    },
    // { $unwind: "$roomDetail" }
  ];
  const meetingData = await Agenda.aggregate(pipeLine);
  //.limit(1);
  console.log("meetingData---------3345--", meetingData);
  if (meetingData.length !== 0) {
    const meetingDataObject = {
      agendaDetails: [],
    };
    meetingData.map((data) => {
      if (!meetingDataObject.meetingDetail) {
        data.meetingDetail.attendees.map((item) => {
          // console.log("item---------", item);
          const attendeeData = data.attendeesDetail.find(
            (attendee) => attendee._id == item._id.toString()
          );
          // console.log("attendeeData---------", attendeeData);
          item.name = attendeeData.name;
          item.email = attendeeData.email;
          item.isEmployee = attendeeData.isEmployee;

          return item;
          // return (item.name = attendeeData.name);
        });


        meetingDataObject.meetingDetail = data.meetingDetail;
        meetingDataObject.meetingDetail["roomDetail"] = data.roomDetail;
      }


      console.log("data.minutesDetail--------------", data.minutesDetail);
      if (data.minutesDetail.length !== 0) {
        data.minutesDetail.map((minute) => {
          console.log("minute map------------------------",minute)
          const assignedUserDetails = data.assignedUserIdDetails.find(
            (user) => user._id.toString() === minute.assignedUserId.toString()
          );
          console.log(
            "assignedUserDetails----------------",
            assignedUserDetails
          );
          minute.attendees.map((attendee)=>{
            const attendeeData = data.attendeesDetail.find(
              (user) => user._id.toString() === attendee.id.toString()
            );
            console.log(
              "attendeeDeta----------------",
              attendeeData
            );
            attendee['email'] = attendeeData.email;
            attendee['name']=attendeeData.name;
            return attendee;
          })
          return (minute["assignedUserDetails"] = assignedUserDetails);
        });
      }


      delete data.meetingDetail;
      delete data.roomDetail;
      delete data.attendeesDetail;
      delete data.assignedUserIdDetails;
      meetingDataObject.agendaDetails.push(data);

    });

    // console.log("meetingDataObject", meetingDataObject);
    return meetingDataObject;
  }
  return false;
};

module.exports = {
  createAgendaForMeeting,
  viewAgendas,
};
