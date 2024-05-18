const express = require("express");
const router = express.Router();
const actionValidator = require("../validators/actionValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const actionController = require("../controllers/actionController");

router.post(
  "/actionComment",
  authMiddleware.verifyUserToken,
  actionValidator.actionCommentsValidator,
  actionController.actionComments
);
/* ACTION REASSIGN REQUEST  */
router.put(
  "/actionReAssignRequest/:id",
  authMiddleware.verifyUserToken,
  actionValidator.actionReassignRequestValidator,
  actionController.actionReassignRequest
);

/* VIEW SINGLE ACTION DETAILS  */
router.get(
  "/viewSingleAction/:id",
  authMiddleware.verifyUserToken,
  actionValidator.viewSingleActionValidator,
  actionController.viewSingleAction
);

/* VIEW ALL ACTION LIST  */
router.get(
  "/viewAllActions",
  authMiddleware.verifyUserToken,
  authMiddleware.verifyUserToken,
  actionValidator.viewAllActionsValidator,
  actionController.viewAllActions
);

/* VIEW ACTION COMMENT  */
router.get(
  "/viewActionComment",
  authMiddleware.verifyUserToken,
  authMiddleware.verifyUserToken,
  actionController.viewActionComment
);

/* REASSIGN ACTION  */
router.put(
  "/reAssignAction/:id",
  authMiddleware.verifyUserToken,
  actionValidator.reAssignActionValidator,
  actionController.reAssignAction
);

/* VIEW USER ALL ACTION LIST  */
router.get(
  "/viewUserAllActions",
  authMiddleware.verifyUserToken,
  actionValidator.viewAllActionsValidator,
  actionController.viewUserAllActions
);

/* UPDATE ACTION   */
router.put(
  "/updateAction/:id",
  authMiddleware.verifyUserToken,
  actionValidator.updateActionValidator,
  actionController.updateAction
);

/* VIEW ACTION   */
router.get(
  "/viewActionActivities/:id",
  authMiddleware.verifyUserToken,
  actionValidator.viewActionActivities,
  actionController.viewActionActivities
);
module.exports = router;
