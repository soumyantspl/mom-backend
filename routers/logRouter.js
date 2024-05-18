const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const validator = require("../validators/logValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* VIEW LOG LIST  */
router.get(
  "/viewLogs",
  authMiddleware.verifyUserToken,
  validator.viewLogsValidator,
  logController.viewLogs
);

module.exports = router;
