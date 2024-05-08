const express = require("express");
const router = express.Router();
const {
  createDepartmentController,
  editDepartmentController,
  deleteDepartmentController,
  listDepartmentController,
} = require("../controllers/departmentController");
const {
  createDepartmentValidator,
  editDepartmentValidator,
  deleteDepartmentValidator,
} = require("../validators/departmentValidator");

//CREATING DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/createDepartment",
  createDepartmentValidator,
  createDepartmentController
);
//EDIT  DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/editDepartment",
  editDepartmentValidator,
  editDepartmentController
);
//DELETE DEPARTMEMNT
router.delete(
  "/deleteDepartment",
  deleteDepartmentValidator,
  deleteDepartmentController
);

router.get("/listDepartment",listDepartmentController)

module.exports = router;
