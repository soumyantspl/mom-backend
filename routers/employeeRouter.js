const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator = require("../validators/employeeValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE EMPLOYEE  */
router.post(
  "/createEmployee",
  authMiddleware.verifyUserToken,
  validator.createEmployeeValidator,
  employeeController.createEmployee
);

/* EDIT EMPLOYEE  */
router.put(
  "/editEmployee/:id",
  authMiddleware.verifyUserToken,
  validator.editEmployeeValidator,
  employeeController.editEmployee
);
/* DELETE EMPLOYEE  */
router.delete(
  "/deleteEmployee/:id",
  authMiddleware.verifyUserToken,
  validator.deleteEmployeValidator,
  employeeController.deleteEmploye
);
/* VIEW EMPLOYEE  */
router.get(
  "/listEmployee",
  authMiddleware.verifyUserToken,
  validator.listEmployesValidator,
  employeeController.listEmployee
);
/* VIEW SINGLE EMPLOYEE  */
router.get(
  "/viewSingleEmployee/:id",
  authMiddleware.verifyUserToken,
  validator.viewSingleEmployeeValidator,
  employeeController.viewSingleEmploye
);

module.exports = router;
