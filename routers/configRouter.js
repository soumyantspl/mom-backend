const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const validator = require("../validators/configValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE CONFIGURATION  */
router.post(
  "/createConfiguration",
  validator.createConfigValidator,
  authMiddleware.verifyUserToken,
  configController.createConfig
);

/* EDIT CONFIGURATION  */
router.put(
  "/editConfiguration/:id",
  validator.updateConfigValidator,
  authMiddleware.verifyUserToken,
  configController.editConfig
);

/* VIEW CONFIGURATION  */
router.get(
  "/viewConfiguration/:organizationId",
  validator.viewConfigValidator,
  authMiddleware.verifyUserToken,
  configController.viewConfig
);

/* DELETE CONFIGURATION  */
router.delete(
  "/deleteConfiguration/:id",
  validator.deleteConfigValidator,
  authMiddleware.verifyUserToken,
  configController.deleteConfig
);

module.exports = router;
