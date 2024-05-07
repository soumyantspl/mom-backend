const express = require("express");
const router = express.Router();
const {
  validateCreateDesignation,
  editDesignationValidator,
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
router.post("/deleteDesignation", deleteDesignationController);
router.get("/listDesignation", listDesignationController);
module.exports = router;
