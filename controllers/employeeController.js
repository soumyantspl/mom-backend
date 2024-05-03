const { addEmployeeService } = require("../services/employeeService");

const addEmployeeController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await addEmployeeService(name, email, password);
    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = { addEmployeeController };
