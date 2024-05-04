const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/authController");
const validator = require("../validators/authValidator");

/* SEND OTP AT SIGN IN USER BY OTP */
router.post("/sendOtp", validator.sendOtpValidator, sendOtp);
module.exports = router;
