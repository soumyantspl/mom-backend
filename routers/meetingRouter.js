const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const validator = require("../validators/meetingValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const agendaController = require("../controllers/agendaController");

/* CREATE MEETING  */
router.post(
  "/createMeeting",
  validator.createMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.createMeeting
);
/*UPDATE RSVP */
router.put("/updateRsvp", meetingController.updateRsvp);
/* CANCEL MEETING */
router.put(
  "/cancelMeeting",
  validator.cancelMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.cancelMeeting
);
/* UPDATE MEETING  */
router.put(
  "/updateMeeting/:id",

  validator.updateMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.updateMeeting
);
/* VIEW SINGLE MEETING  */
router.get(
  "/viewMeeting/:id",
  validator.viewMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.viewMeeting
);
/* VIEW ALL MEETINGS  */
router.get(
  "/viewAllMeetings",
  validator.viewAllMeetingsValidator,
  authMiddleware.verifyUserToken,
  meetingController.viewAllMeetings
);
/* LIST ATTENDEES FROM PREVIOOUS MEETING */
router.get(
  "/listAttendeesFromPreviousMeeting",
  validator.listAttendeesFromPreviousMeetingValidator,
  authMiddleware.verifyUserToken,
  meetingController.listAttendeesFromPreviousMeeting
);
/* VIEW SINGLE MEETING ALL AGENDA WITH MINUTES  */
router.get(
  "/viewMeetingAgendaWithMinutes/:id",
  validator.viewMeetingValidator,
  authMiddleware.verifyUserToken,
  agendaController.viewAgendas
);
/* VIEW MEETING ACTIVITIES LIST   */
router.get(
  "/viewMeetingActivities/:id",
  validator.meetingActivitieslist,
  authMiddleware.verifyUserToken,
  meetingController.viewMeetingActivities
);

module.exports = router;
