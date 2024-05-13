const Meeting = require("../models/meetingModel");

/**FUNC- CREATE MEETING */
const createMeeting = async (data) => {
//   console.log("----------------------33333", data);
//   const roomDetails = await checkDuplicateEntry(
//     data.title,
//     data.organizationId
//   );
//   console.log("roomDetails--------------", roomDetails);
 // if (!roomDetails) {
    const inputData = {
      title: data.title,
      mode:data.mode,
      link:data.link,
      date:new Date(data.date),
      organizationId: data.organizationId,
      locationDetails: data.locationDetails,
      step:1
    };
    const meetingData = new Meeting(inputData);
    const newMeeting = await meetingData.save();
    console.log("newMeeting----------------", newMeeting);

    return newMeeting;
 // }

  //return false;
};

/**FUNC- UPDATE MEETING */
const updateMeeting = async (data,id) => {
     console.log("----------------------33333", data);
     if(data.step==2){
      const updateData = {
        attendees:data.attendees,
        step:2
      };



   const roomDetails = await checkDuplicateEntry(
      data.title,
      data.organizationId
    );
     }

     if(data.step==3){
      const updateData = {
        attendees:data.attendees,
        step:2
      };
        }

  //   const roomDetails = await checkDuplicateEntry(
  //     data.title,
  //     data.organizationId
  //   );
  //   console.log("roomDetails--------------", roomDetails);
   // if (!roomDetails) {
      const updateData = {
        title: data.title,
        mode:data.mode,
        link:data.link,
        date:new Date(data.date),
        locationDetails: data.locationDetails,
      };
      const meetingData = new Meeting(inputData);
      const newMeeting = await meetingData.save();
      console.log("newMeeting----------------", newMeeting);
  
      return newMeeting;
   // }
  
    //return false;
  };
  


module.exports = {
    createMeeting,updateMeeting
  };
