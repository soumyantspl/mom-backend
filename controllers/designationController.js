const { createDesignation } = require("../services/designationService");
const createDesignationController = async (req, res) => {
  try {
    const { name, organisationId } = req.body;
    const result = await createDesignation(name, organisationId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};
module.exports = { createDesignationController };
