const Employee = require("../models/employeeModel");

const signInService = async (email, password) => {
  try {
    const employee = await Employee.findOne({ email });
    console.log("employee");
    
    if (!user) {
      return { error: "Employee not found" };
    }
    if (Employee.password !== password) {
      return { error: "Invalid Password" };
    }

    return {
      message: "SignIn successfull",
    };
  } catch (error) {
    console.log(error);
    return { error: "Internal Server Error" };
  }
};

module.exports = {
  signInService,
};
