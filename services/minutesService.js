const Minutes = require("../models/minutesModel");
const Agenda = require("../models/agendaModel");
const employeeService = require("./employeeService");
const Rooms = require("../models/roomModel");
const { getAllAttendees } = require("./meetingService");
const { createMeetingActivities } = require("./meetingService");
const fileService = require("./fileService");
const Meetings = require("../models/meetingModel");
const ObjectId = require("mongoose").Types.ObjectId;
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
const downLoadMinutes1 = async (meetingId) => {
  const minutesData = await Minutes.aggregate([
    {
      $match: {
        meetingId: new ObjectId(meetingId),
        //  isAction:false,
      },
    },

    {
      $lookup: {
        from: "organizations",
        localField: "organizationId",
        foreignField: "_id",
        as: "organizationDetail",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "attendees.id",
        foreignField: "_id",
        as: "attendeesDetails",
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
        localField: "amendmentDetails.createdById",
        foreignField: "_id",
        as: "amendmentDetail",
      },
    },

    {
      $lookup: {
        from: "employees",
        localField: "assignedUserId",
        foreignField: "_id",
        as: "assignedUserDetail",
      },
    },

    {
      $lookup: {
        from: "employees",
        localField: "reassignedUserId",
        foreignField: "_id",
        as: "reAssignedUserDetail",
      },
    },

    {
      $project: {
        _id: 1,
        attendees: 1,
        description: 1,
        title: 1,
        priority: 1,
        amendmentDetails: 1,
        dueDate: 1,
        reassignedUserId: 1,
        assignedUserId: 1,
        // mode: 1,
        // link: 1,
        // date: 1,
        // fromTime: 1,
        // toTime: 1,
        // locationDetails: 1,
        organizationDetail: {
          name: 1,
        },
        createdByDetails: {
          name: 1,
        },
        attendeesDetails: {
          email: 1,
          _id: 1,
          name: 1,
          status: 1,
        },
        amendmentDetail: {
          name: 1,
          // details:1,
          // status:1
        },
        assignedUserDetail: {
          name: 1,
          // details:1,
          // status:1
        },
        reAssignedUserDetail: {
          name: 1,
          // details:1,
          // status:1
        },
      },
    },
    { $unwind: "$organizationDetail" },
    { $unwind: "$createdByDetails" },
    { $unwind: "$amendmentDetail" },
    { $unwind: "$assignedUserDetail" },
    { $unwind: "$reAssignedUserDetail" },
  ]);
  console.log("minutesData--------------", minutesData);

  // attendees: [
  //   {
  //     id: {
  //       type: mongoose.Schema.ObjectId,
  //       required: true,
  //     },
  //     status: {
  //       type: String,
  //       enum: ["ACCEPTED", "REJECT", "PENDING"],
  //       required: true,
  //     },
  //   },
  // ],
  let pendingUsers = [];
  let rejectedBy = [];
  let acceptedBy = [];
  const newData = minutesData.map((item, index) => {
    console.log("attendeesDetails---------------", item.attendeesDetails);
    item.attendeesDetails.map((attendee) => {
      console.log("item.attendees--------", item.attendees);
      console.log("attendees--------", attendee);
      const currentAttendee = item.attendees.find(
        (i) => i.id.toString() == attendee._id
      );

      console.log("currentAttendee--------", currentAttendee);
      if (currentAttendee.status == "ACCEPTED") {
        acceptedBy.push(attendee.name);
      }
      if (currentAttendee.status == "REJECTED") {
        rejectedBy.push(attendee.name);
      }
      if (currentAttendee.status == "PENDING") {
        pendingUsers.push(attendee.name);
      }
      const actionData = {
        pendingUsers,
        rejectedBy,
        acceptedBy,
      };
      console.log("actionData---------------", actionData);
      minutesData[index]["actionData"] = actionData;
      return item;
    });
  });
  console.log(rejectedBy);
  console.log("newData--------------------", minutesData[0].actionData);
  return await fileService.generatePdf(minutesData);
};

//FUNCTION TO DOWNLOAD MINUTES
const downLoadMinutes = async (meetingId) => {
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
        localField: "meetingDetail.attendees.id",
        foreignField: "_id",
        as: "attendeesDetails",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "minutesDetail.assignedUserId",
        foreignField: "_id",
        as: "assignedUserDetail",
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "minutesDetail.reassignedUserId",
        foreignField: "_id",
        as: "reAssignedUserDetail",
      },
    },
    // {
    //   $lookup: {
    //     from: "employees",
    //     localField: "createdById",
    //     foreignField: "_id",
    //     as: "createdByDetails",
    //   },
    // },
    {
      $project: {
        _id: 1,
        title: 1,
        timeLine: 1,
        topic: 1,
        meetingDetail: {
          title: 1,
          _id: 1,
          link: 1,
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
        attendeesDetails: {
          // email: 1,
           _id: 1,
          name: 1,
          status: 1,
        },
        assignedUserDetail: {
          _id: 1,
          name: 1,
        },
        reAssignedUserDetail: {
          _id: 1,
          name: 1,
        },
        
        // locationDetails: {
        //   location: 1,
        // },
      },
    },
    //  { $unwind: "$assignedUserDetail" },
  ];
  const meetingData = await Agenda.aggregate(pipeLine).limit(1);
  console.log("meetingData-------------", meetingData[0]);
  
  if (meetingData.length !== 0) {
    if (meetingData[0].meetingDetail.locationDetails.roomId) {
      console.log(
        "meetingData[0]--------------",
        meetingData[0].meetingDetail.locationDetails.roomId
      );
      const roomId =
        meetingData[0].meetingDetail.locationDetails.roomId.toString();
      console.log("roomId", roomId);
      var roomsData = await Rooms.findById(roomId, {
        _id: 1,
        title: 1,
        location: 1,
      });
      console.log("roomsData-----------", roomsData);
    }
    const meetingDataObject = {
      agendaDetails: [],
    };
    meetingData.map((item) => {
      if (!meetingDataObject.meetingDetail) {
        meetingDataObject.meetingDetail = item.meetingDetail;
      }
      delete item.meetingDetail;
      meetingDataObject.agendaDetails.push(item);
      meetingDataObject.meetingDetail.attendeesDetails = item.attendeesDetails;

      item.minute;
    });
    meetingDataObject.meetingDetail.location = roomsData
      ? roomsData.location
      : meetingDataObject.meetingDetail.locationDetails.location;
    console.log("meetingDataObject---------------------", meetingDataObject);

    meetingDataObject.agendaDetails.map((item) => {
      item.minutesDetail.map((minutesItem) => {
        const assignedUserDetails = item.assignedUserDetail.find(
          (i) => i._id.toString() == minutesItem.assignedUserId
        );

        const reAssignedUserDetails = item.reAssignedUserDetail.find(
          (i) => i._id.toString() == minutesItem.reassignedUserId
        );

        
        console.log("assignedUserDetails--------", assignedUserDetails);
        console.log("reAssignedUserDetails--------", reAssignedUserDetails);
        minutesItem.reassignedUserName = reAssignedUserDetails?.name
       
        minutesItem.assignedUserName = assignedUserDetails?.name;

        return minutesItem;
       
      });
    });

    // const newData = minutesData.map((item, index) => {
    //   console.log("attendeesDetails---------------", item.attendeesDetails);
    //   item.attendeesDetails.map((attendee) => {
    //     console.log("item.attendees--------", item.attendees);
    //     console.log("attendees--------", attendee);
    //     const currentAttendee = item.attendees.find(
    //       (i) => i.id.toString() == attendee._id
    //     );

    //     console.log("currentAttendee--------", currentAttendee);
    //     if (currentAttendee.status == "ACCEPTED") {
    //       acceptedBy.push(attendee.name);
    //     }
    //     if (currentAttendee.status == "REJECTED") {
    //       rejectedBy.push(attendee.name);
    //     }
    //     if (currentAttendee.status == "PENDING") {
    //       pendingUsers.push(attendee.name);
    //     }
    //     const actionData = {
    //       pendingUsers,
    //       rejectedBy,
    //       acceptedBy,
    //     };
    //     console.log("actionData---------------", actionData);
    //     minutesData[index]["actionData"] = actionData;
    //     return item;
    //   });
    // });



    meetingDataObject.agendaDetails.map((mainItem)=>{

      console.log('--------7777777777777777777777---------',mainItem)
      mainItem.minutesDetail.map((minuteItem)=>{
        console.log('--------88888888888888---------',minuteItem)


        let pendingUsers = [];
        let rejectedBy = [];
        let acceptedBy = [];
      //  minuteItem.attendees?.map((attendeeItem)=>{

  // console.log('--------attendeeItem---------',attendeeItem)
          



          // const currentAttendee = meetingDataObject.meetingDetail.attendeesDetails?.find(
          //   (i) => i._id.toString() == attendeeItem.id.toString()
          // );

        
          meetingDataObject.meetingDetail.attendeesDetails.map((attendeeItem)=>{
         
            const currentAttendee =  minuteItem.attendees?.find(
              (i) => i.id.toString() == attendeeItem._id.toString()
            );
          

                 console.log("currentAttendee--------", currentAttendee);
        if (currentAttendee?.status == "ACCEPTED") {
          acceptedBy.push(attendeeItem.name);
        }
        if (currentAttendee?.status == "REJECTED") {
          rejectedBy.push(attendeeItem.name);
        }
        if (currentAttendee?.status == "PENDING") {
          pendingUsers.push(attendeeItem.name);
        }
        const actionData = {
          pendingUsers,
          rejectedBy,
          acceptedBy,
        };
        console.log("actionData---------------", actionData);
        minuteItem["actionData"] = actionData;
        return minuteItem;
          
        //   console.log('--------attendeeItem---------',attendeeItem)
        //   console.log("meetingData-----------4444444",meetingDataObject.meetingDetail.attendeesDetails)
        //   const currentAttendee = meetingDataObject.meetingDetail.attendeesDetails       attendeeItem.find(
        //           (i) => i._id.toString() == attendeeItem.id.toString()
        //         );
        //         console.log('--------99999999999999---------',currentAttendee)
        })

      })
      })
      console.log('meetingDataObject.agendaDetails--------------------------------------@@@@@@@',meetingDataObject.agendaDetails[0].minutesDetail)



    return await fileService.generateMinutesPdf(meetingDataObject);
    // return meetingDataObject;
  }

  return false;
};

module.exports = {
  acceptRejectMinutes,
  createMinutes,
  downLoadMinutes,
};
