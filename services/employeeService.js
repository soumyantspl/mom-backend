const Employee = require("../models/employeeModel");

const addEmployeeService = async (name, email, password) => {
  const newEmployee = new Employees({ name, email, password });
  await newEmployee.save();
  return newEmployee;
};

module.exports = {
  addEmployeeService, 
};
