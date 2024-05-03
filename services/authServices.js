const Employee = require("../models/employeeModel");

const signInService = async (email, password) => {
  try {
    const employee = await Employee.findOne({ email });
    console.log("employee");
    if (!employee) {
      return { error: "Employee not found" };
    }
    console.log();
    if (employee.password !== password) {
      return { error: "Invalid Password" };
    }
    return {
      message: "SignIn successfull",
    };
  } catch (error) {
    console.log(error);
    return { error: "Error in service" };
  }
};
module.exports = {
  signInService,
};
