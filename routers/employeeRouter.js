const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator = require("../validators/employeeValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE EMPLOYEE  */
router.post(
  "/createEmployee",
  validator.createEmployeeValidator,
  authMiddleware.verifyUserToken,
  employeeController.createEmployee
);

/* EDIT EMPLOYEE  */
router.put(
  "/editEmployee/:id",
  validator.editEmployeeValidator,
  authMiddleware.verifyUserToken,
  employeeController.editEmployee
);
/* DELETE EMPLOYEE  */
router.delete(
  "/deleteEmployee/:id",
  validator.deleteEmployeValidator,
  authMiddleware.verifyUserToken,
  employeeController.deleteEmploye
);
/* VIEW EMPLOYEE  */
router.post(
  "/listEmployee",
  validator.listEmployesValidator,
  authMiddleware.verifyUserToken,
  employeeController.listEmployee
);
/* VIEW SINGLE EMPLOYEE  */
router.get(
  "/viewSingleEmployee/:id",
  validator.viewSingleEmployeeValidator,
  authMiddleware.verifyUserToken,
  employeeController.viewSingleEmploye
);
/* MASTER DATA */
router.get(
  "/masterData/:organizationId",
  validator.masterDataValidator,
  authMiddleware.verifyUserToken,
  employeeController.masterData
);


/* CHECK DUPLICATE VISITOR USER  */
router.post(
  "/checkDuplicateUser",
  validator.checkDuplicateUser,
  authMiddleware.verifyUserToken,
  employeeController.checkDuplicateUser
);
module.exports = router;
