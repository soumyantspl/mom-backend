
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator=require('../validators/employeeValidator')
const authMiddleware=require('../middlewares/authMiddleware')

/* CREATE EMPLOYEE  */
router.post("/createEmployee", validator.createEmployeeValidator, employeeController.createEmployee);

/* EDIT EMPLOYEE  */
router.put("/editEmployee/:id", validator.editEmployeeValidator, employeeController.editEmployee);

module.exports = router;
