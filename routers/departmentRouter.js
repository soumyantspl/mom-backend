const express = require("express");
const router = express.Router();
const {
  createDepartmentController,
} = require("../controllers/departmentController");
const {
  createDepartmentValidator,
} = require("../validators/departmentValidator");

//CREATING DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/createDepartment",
  createDepartmentValidator,
  createDepartmentController
);

module.exports = router;
