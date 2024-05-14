const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const validator=require('../validators/meetingValidator')
const authMiddleware=require('../middlewares/authMiddleware')

/* CREATE MEETING  */
router.post("/createMeeting", validator.createMeetingValidator, meetingController.createMeeting);

/* UPDATE MEETING  */
router.put("/updateMeeting/:id", validator.updateMeetingValidator, meetingController.updateMeeting);


/* VIEW SINGLE MEETING  */
router.get("/viewMeeting/:id", validator.viewMeetingValidator, meetingController.viewMeeting);

/* VIEW ALL MEETINGS  */
router.get("/viewAllMeetings", validator.viewAllMeetingsValidator, meetingController.viewAllMeetings);


module.exports = router;
