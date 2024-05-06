const Employee = require("../models/employeeModel");

const addEmployeeService = async (name, email, password) => {
  const newEmployee = new Employee({ name, email, password });
  return await newEmployee.save();
};

const viewEmployeeService = async (empId) => {
  const newEmployee = new Employee({ name, email, password });
  return await newEmployee.save();
};

/**FUNC- TO VERIFY ACTIVE USER*/
const verifyEmployee = async (empId) => {
  console.log("empId-----------", empId);
  return await Employee.findOne(
    { _id: empId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};

module.exports = {
  addEmployeeService,
  viewEmployeeService,
  verifyEmployee,
};
