const express = require("express");
const router = express.Router();
const commentsValidator = require("../validators/commentsValidator");

const commentsController = require("../controllers/commentController");

router.post(
  "/actionComment",
  commentsValidator.actionCommentsValidator,
  commentsController.actionComments
);

module.exports = router;
