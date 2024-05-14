const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const validator = require("../validators/logValidator");


/* VIEW LOG LIST  */
router.get("/viewLogs", validator.viewLogsValidator, logController.viewLogs);

module.exports = router;