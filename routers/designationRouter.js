const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const designationValidator = require("../validators/designationValidator");
const designationController = require("../controllers/designationController");

router.post(
  "/createDesignation",
  authMiddleware.verifyUserToken,
  designationValidator.validateCreateDesignation,
  designationController.createDesignationController
);
router.post(
  "/editDesignation",
  authMiddleware.verifyUserToken,
  designationValidator.editDesignationValidator,
  designationController.editDesignationController
);
router.delete(
  "/deleteDesignation",
  authMiddleware.verifyUserToken,
  designationController.deleteDesignationController
);
router.get(
  "/listDesignation",
  authMiddleware.verifyUserToken,
  designationValidator.listDesignationValidator,
  designationController.listDesignationController
);
module.exports = router;
