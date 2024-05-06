const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const employeeValidator=require('../validators/employeeValidator')
const authMiddleware=require('../middlewares/authMiddleware')
//router.post("/addEmployee", addEmployeeController);
router.get("/viewEmployee", 
employeeValidator.viewEmployeeValidator,authMiddleware.verifyUserToken,
EmployeeController.viewEmployee);
module.exports = router;
