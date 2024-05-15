const express = require("express");
const router = express.Router();
const actionValidator = require("../validators/actionValidator");

const actionController = require("../controllers/actionController");

router.post(
  "/actionComment",
  actionValidator.actionCommentsValidator,
  actionController.actionComments
);
/* ACTION REASSIGN REQUEST  */
router.put(
  "/actionReAssignRequest/:id",
  actionValidator.actionReassignRequestValidator,
  actionController.actionReassignRequest
);

/* VIEW SINGLE ACTION DETAILS  */
router.get(
  "/viewSingleAction/:id",
  actionValidator.viewSingleActionValidator,
  actionController.viewSingleAction
);

router.get("/viewActionComment", actionController.viewActionComment);

module.exports = router;
