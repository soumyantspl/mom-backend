const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const validator = require("../validators/meetingValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const agendaController = require("../controllers/agendaController");

/* CREATE MEETING  */
router.post(
  "/createMeeting",
  authMiddleware.verifyUserToken,
  validator.createMeetingValidator,
  meetingController.createMeeting
);
/*UPDATE RSVP */
router.put("/updateRsvp", meetingController.updateRsvp);
/* CANCEL MEETING */
router.put(
  "/cancelMeeting",
  authMiddleware.verifyUserToken,
  validator.cancelMeetingValidator,
  meetingController.cancelMeeting
);
/* UPDATE MEETING  */
router.put(
  "/updateMeeting/:id",
  authMiddleware.verifyUserToken,
  validator.updateMeetingValidator,
  meetingController.updateMeeting
);
/* VIEW SINGLE MEETING  */
router.get(
  "/viewMeeting/:id",
  authMiddleware.verifyUserToken,
  validator.viewMeetingValidator,
  meetingController.viewMeeting
);
/* VIEW ALL MEETINGS  */
router.get(
  "/viewAllMeetings",
  authMiddleware.verifyUserToken,
  validator.viewAllMeetingsValidator,
  meetingController.viewAllMeetings
);
/* LIST ATTENDEES FROM PREVIOOUS MEETING */
router.get(
  "/listAttendeesFromPreviousMeeting",
  authMiddleware.verifyUserToken,
  validator.listAttendeesFromPreviousMeetingValidator,
  meetingController.listAttendeesFromPreviousMeeting
);
/* VIEW SINGLE MEETING ALL AGENDA WITH MINUTES  */
router.get(
  "/viewMeetingAgendaWithMinutes/:id",
  authMiddleware.verifyUserToken,
  validator.viewMeetingValidator,
  agendaController.viewAgendas
);
/* VIEW MEETING ACTIVITIES LIST   */
router.get(
  "/viewMeetingActivities/:id",
  authMiddleware.verifyUserToken,
  validator.meetingActivitieslist,
  meetingController.viewMeetingActivities
);

module.exports = router;
