const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentController");

router.post("/actionComment", commentsController.actionComments);

module.exports = router;
