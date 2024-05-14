const express = require("express");
const router = express.Router();
const commentsValidator = require("../validators/actionValidator");

const commentsController = require("../controllers/actionController");

router.post(
  "/actionComment",
  commentsValidator.actionCommentsValidator,
  commentsController.actionComments
);

module.exports = router;
