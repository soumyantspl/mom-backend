const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const employeeValidator=require('../validators/employeeValidator')
//router.post("/addEmployee", addEmployeeController);
router.get("/viewEmployee", employeeValidator.viewEmployeeValidator,EmployeeController.viewEmployee);
module.exports = router;
