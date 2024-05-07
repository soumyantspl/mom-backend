const express = require("express");
const router = express.Router();
const {
  createDepartmentController,
  editDepartmentController,
} = require("../controllers/departmentController");
const {
  createDepartmentValidator,
  editDepartmentValidator,
} = require("../validators/departmentValidator");

//CREATING DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/createDepartment",
  createDepartmentValidator,
  createDepartmentController
);
router.post(
  "/editDepartment",
  editDepartmentValidator,
  editDepartmentController
);

module.exports = router;
