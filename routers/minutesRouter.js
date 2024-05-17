const express = require("express");
const router = express.Router();
const minutesController = require("../controllers/minutesController");
const validator = require("../validators/minutesValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* MEETING MINUTE  */
router.put(
  "/acceptOrRejectMinutes",
  validator.acceptOrRejectMinutesValidator,
  minutesController.acceptRejectMinutes
);
/*CREATE MINUTE */
router.post(
  "/createMinutes",
  validator.createMinutesValidator,
  minutesController.createMinutes
);



/*DOWNLOAD MINUTE */
router.get(
  "/downloadMinutes/:id",
  validator.downloadMinutesValidator,
  minutesController.downloadMinutes
);

module.exports = router;
