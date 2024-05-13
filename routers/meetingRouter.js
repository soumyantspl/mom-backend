const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const validator = require("../validators/meetingValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE MEETING  */
router.post(
  "/createMeeting",
  validator.createMeetingValidator,
  meetingController.createMeeting
);
router.put("/updateRsvp", meetingController.updateRsvp);

module.exports = router;
