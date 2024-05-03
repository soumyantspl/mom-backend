const { addEmployeeService } = require("../services/employeeService");

const addEmployeeController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await addEmployeeService(name, email, password);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addEmployeeController };
