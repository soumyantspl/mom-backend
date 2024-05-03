const Employee = require("../models/employeeModel");

/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
  return await Employee.findOne(
    { email, isActive: true },
    { isActive: 1, _id: 1, email: 1 }
  );
};

module.exports = {
    verifyEmail,
  };
  
