const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/authController");
const { signInController } = require("../controllers/authController");
router.post("/sendOtp", sendOtp);
router.post("/signIn", signInController);
module.exports = router;
