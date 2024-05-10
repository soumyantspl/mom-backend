const express = require("express");
const router = express.Router();
const {
  validateCreateDesignation,
  editDesignationValidator,
  listDesignationValidator,
} = require("../validators/designationValidator");
const {
  createDesignationController,
  editDesignationController,
  deleteDesignationController,
  listDesignationController,
} = require("../controllers/designationController");
router.post(
  "/createDesignation",
  validateCreateDesignation,
  createDesignationController
);
router.post(
  "/editDesignation",
  editDesignationValidator,
  editDesignationController
);
router.delete("/deleteDesignation", deleteDesignationController);
router.get(
  "/listDesignation",
  listDesignationValidator,
  listDesignationController
);
module.exports = router;
