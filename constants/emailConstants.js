const commonHelper = require("../helpers/commonHelper");

const signInOtpsubject = "Meeting Plus OTP Verification";
const updateMeetingSubject = "Meeting has been updated!";
const createMeetingSubject = "A new meeting is created!";
//const cancelMeetingSubject=: Meeting Canclled: [Meeting Title] @ [Date & Time] ([Meeting Organiser’s Email Address])
const cancelMeetingSubject = async (meetingData) => {
  return ` Meeting Cancelled :${meetingData.title} @ ${new Date(
    meetingData.date
  ).toDateString()} 
     ${commonHelper.formatTimeFormat(meetingData.fromTime)}
    -  ${commonHelper.formatTimeFormat(meetingData.toTime)}
   (${meetingData.createdByDetail.email})`;
};

const scheduleMeetingSubject = () => {
  return `Invitation : ${meetingData.title} @ ${new Date(
    meetingData.date
  ).toDateString()} 
     ${commonHelper.formatTimeFormat(meetingData.fromTime)}
    -  ${commonHelper.formatTimeFormat(meetingData.toTime)}
   (${meetingData.createdByDetail.email})`;
};
module.exports = {
  signInOtpsubject,
  updateMeetingSubject,
  createMeetingSubject,
  cancelMeetingSubject,
  scheduleMeetingSubject,
};
