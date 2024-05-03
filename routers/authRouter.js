const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/authController");
const {sendOtpValidator}=require("../validators/authValidator")
router.post("/sendOtp",sendOtpValidator,sendOtp );
module.exports = router;
