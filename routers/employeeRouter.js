const express = require("express");
const router = express.Router();
const { addEmployeeController } = require("../controllers/employeeController");
router.post("/addEmployee", addEmployeeController);
module.exports = router;
