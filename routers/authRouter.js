const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/authController");
router.post("/sendOtp", sendOtp);
module.exports = router;
