const express = require("express");
const router = express.Router();
const minutesController = require("../controllers/minutesController");
const validator = require("../validators/minutesValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* MEETING ACCEPTANCE  */
router.put(
  "/acceptOrRejectMinutes",
  validator.acceptOrRejectMinutesValidator,
  minutesController.acceptRejectMinutes
);
/*CREATE  MEETING */
router.post(
  "/createMinutes",
  validator.createMinutesValidator,
  minutesController.createMinutes
);

module.exports = router;
