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
  meetingController.createMeeting
);
router.put("/updateRsvp", meetingController.updateRsvp);
router.put(
  "/cancelMeeting",
  validator.cancelMeetingValidator,
  meetingController.cancelMeeting
);

/* UPDATE MEETING  */
router.put(
  "/updateMeeting/:id",
  validator.updateMeetingValidator,
  meetingController.updateMeeting
);

/* VIEW SINGLE MEETING  */
router.get(
  "/viewMeeting/:id",
  validator.viewMeetingValidator,
  meetingController.viewMeeting
);

/* VIEW ALL MEETINGS  */
router.get(
  "/viewAllMeetings",
  validator.viewAllMeetingsValidator,
  meetingController.viewAllMeetings
);

router.get(
  "/listAttendeesFromPreviousMeeting",
  validator.listAttendeesFromPreviousMeetingValidator,
  meetingController.listAttendeesFromPreviousMeeting
);

/* VIEW SINGLE MEETING ALL AGENDA WITH MINUTES  */
router.get(
  "/viewMeetingAgendaWithMinutes/:id",
  validator.viewMeetingValidator,
  agendaController.viewAgendas
);

/* VIEW MEETING ACTIVITIES LIST   */
router.get(
  "/viewMeetingActivities/:id",
  validator.meetingActivitieslist,
  meetingController.viewMeetingActivities
);

module.exports = router;
