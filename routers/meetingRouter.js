const express = require("express");
const router = express.Router();
const { view } = require("../controllers/meetingController");
router.get("/view", view);
module.exports = router;
