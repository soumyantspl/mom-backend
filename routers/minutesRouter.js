const express = require("express");
const router = express.Router();
const minutesController = require("../controllers/minutesController");
const validator = require("../validators/minutesValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* MEETING MINUTE  */
router.put(
  "/acceptOrRejectMinutes",
  validator.acceptOrRejectMinutesValidator,
  authMiddleware.verifyUserToken,
  minutesController.acceptRejectMinutes
);
/*CREATE MINUTE */
router.post(
  "/createMinutes",
  validator.createMinutesValidator,
  authMiddleware.verifyUserToken,
  minutesController.createMinutes
);



/*DOWNLOAD MINUTE */
router.get(
  "/downloadMinutes/:meetingId",
  validator.downloadMinutesValidator,
  minutesController.downloadMinutes
);

module.exports = router;
