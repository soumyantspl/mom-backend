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




module.exports = router;
