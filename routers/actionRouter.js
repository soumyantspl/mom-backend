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

/* VIEW ALL ACTION LIST  */
router.get(
  "/viewAllActions",
  actionValidator.viewAllActionsValidator,
  actionController.viewAllActions
);

router.get("/viewActionComment", actionController.viewActionComment);

/* REASSIGN ACTION  */
router.put(
  "/reAssignAction/:id",
  actionValidator.reAssignActionValidator,
  actionController.reAssignAction
);

/* VIEW USER ALL ACTION LIST  */
router.get(
  "/viewUserAllActions",
  actionValidator.viewAllActionsValidator,
  actionController.viewUserAllActions
);

/* UPDATE ACTION   */
router.put(
  "/updateAction/:id",
  actionValidator.updateActionValidator,
  actionController.updateAction
);

router.get(
  "/viewActionActivities/:id",
  actionValidator.viewActionActivities,
  actionController.viewActionActivities
);
module.exports = router;
