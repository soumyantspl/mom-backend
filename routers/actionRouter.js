const express = require("express");
const router = express.Router();
const actionValidator = require("../validators/actionValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const actionController = require("../controllers/actionController");

router.post(
  "/actionComment",
  actionValidator.actionCommentsValidator,
  authMiddleware.verifyUserToken,
  actionController.actionComments
);
/* ACTION REASSIGN REQUEST  */
router.put(
  "/actionReAssignRequest/:id",
  actionValidator.actionReassignRequestValidator,
  authMiddleware.verifyUserToken,
  actionController.actionReassignRequest
);

/* VIEW SINGLE ACTION DETAILS  */
router.get(
  "/viewSingleAction/:id",
  actionValidator.viewSingleActionValidator,
  authMiddleware.verifyUserToken,
  actionController.viewSingleAction
);

/* VIEW ALL ACTION LIST  */
router.get(
  "/viewAllActions",
  actionValidator.viewAllActionsValidator,
  authMiddleware.verifyUserToken,
  actionController.viewAllActions
);

/* VIEW ACTION COMMENT  */
router.get(
  "/viewActionComment",
  actionValidator.viewActionCommentValidator,
  authMiddleware.verifyUserToken,
  actionController.viewActionComment
);

/* REASSIGN ACTION  */
router.put(
  "/reAssignAction/:id",
  actionValidator.reAssignActionValidator,
  authMiddleware.verifyUserToken,
  actionController.reAssignAction
);

/* VIEW USER ALL ACTION LIST  */
router.get(
  "/viewUserAllActions",
  actionValidator.viewAllActionsValidator,
  authMiddleware.verifyUserToken,
  actionController.viewUserAllActions
);

/* UPDATE ACTION   */
router.put(
  "/updateAction/:id",
  actionValidator.updateActionValidator,
  authMiddleware.verifyUserToken,
  actionController.updateAction
);

/* VIEW ACTION   */
router.get(
  "/viewActionActivities/:id",
  actionValidator.viewActionActivities,
  authMiddleware.verifyUserToken,
  actionController.viewActionActivities
);
module.exports = router;
