const express = require("express");
const router = express.Router();
const { validateDesignation } = require("../validators/designationValidator");
const {
  createDesignationController,
} = require("../controllers/designationController");
router.post(
  "/addDesignation",
  validateDesignation,
  createDesignationController
);
module.exports = router;
