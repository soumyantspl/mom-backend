const express = require("express");
const router = express.Router();
const minutesController = require("../controllers/minutesController");
const validator = require("../validators/meetingValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* MEETING ACCEPTANCE  */
router.put("/acceptOrRejectMinutes", minutesController.acceptRejectMinutes);

module.exports = router;
