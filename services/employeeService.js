const Employee = require("../models/employeeModel");

const addEmployeeService = async (name, email, password) => {
  try {
    const newEmployee = new Employee({ name, email, password });

    return await newEmployee.save();
    
  } catch (error) {
    return {
      error: error.message
    };
    
  }
};

module.exports = {
  addEmployeeService,
};
