const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const validator=require('../validators/meetingValidator')
const authMiddleware=require('../middlewares/authMiddleware')

/* CREATE MEETING  */
router.post("/createMeeting", validator.createMeetingValidator, meetingController.createMeeting);

/* UPDATE MEETING  */
router.put("/updateMeeting/:id", validator.updateMeetingValidator, meetingController.updateMeeting);

module.exports = router;
