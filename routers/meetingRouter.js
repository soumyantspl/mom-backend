const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const meetingValidator = require("../validators/meetingValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const agendaController = require("../controllers/agendaController");

/* CREATE MEETING  */
router.post(
  "/createMeeting",
  meetingValidator.createMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.createMeeting
);
/*UPDATE RSVP */
router.put(
  "/updateRsvp/:id",
 // meetingValidator.updateRsvpValidator,
  // authMiddleware.verifyUserToken,
  meetingController.updateRsvp
);
/* CANCEL MEETING */
router.put(
  "/cancelMeeting/:id",
  // meetingValidator.cancelMeetingValidator,
  // authMiddleware.verifyUserToken,
  meetingController.cancelMeeting
);
/* UPDATE MEETING  */
router.put(
  "/updateMeeting/:id",
  meetingValidator.updateMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.updateMeeting
);
/* VIEW SINGLE MEETING  */
router.get(
  "/viewMeeting/:id",
  meetingValidator.viewMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.viewMeeting
);
/* VIEW ALL MEETINGS  */
router.get(
  "/viewAllMeetings",
  meetingValidator.viewAllMeetingsValidator,
  authMiddleware.verifyUserToken,
  meetingController.viewAllMeetings
);
/* LIST ATTENDEES FROM PREVIOOUS MEETING */
router.get(
  "/listAttendeesFromPreviousMeeting",
  meetingValidator.listAttendeesFromPreviousMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.listAttendeesFromPreviousMeeting
);
/* VIEW SINGLE MEETING ALL AGENDA WITH MINUTES  */
router.get(
  "/viewMeetingAgendaWithMinutes/:id",
  meetingValidator.viewMeetingValidator,
  authMiddleware.verifyUserToken,
  agendaController.viewAgendas
);
/* VIEW MEETING ACTIVITIES LIST   */
router.get(
  "/viewMeetingActivities/:id",
  meetingValidator.meetingActivitieslist,
  authMiddleware.verifyUserToken,
  meetingController.viewMeetingActivities
);

module.exports = router;
