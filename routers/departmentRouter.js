const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const departmentController = require("../controllers/departmentController");
const departmentValidator = require("../validators/departmentValidator");

//CREATING DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/createDepartment",
  authMiddleware.verifyUserToken,
  departmentValidator.createDepartmentValidator,
  departmentController.createDepartmentController
);
//EDIT  DEPARTMENT USING ORGANIZATION_ID
router.post(
  "/editDepartment",
  authMiddleware.verifyUserToken,
  departmentValidator.editDepartmentValidator,
  departmentController.editDepartmentController
);
//DELETE DEPARTMEMNT
router.delete(
  "/deleteDepartment/:id",
  authMiddleware.verifyUserToken,
  departmentValidator.deleteDepartmentValidator,
  departmentController.deleteDepartmentController
);
//LIST DEPARTMENT
router.get(
  "/listDepartment",
  authMiddleware.verifyUserToken,
  departmentValidator.listDepartmentValidator,
  departmentController.listDepartmentController
);

module.exports = router;
