const {
  createOrganisationService,
} = require("../services/organisationService");

const createOrgansationController = async (req, res) => {
  try {
    const { name, details, email, address, phone } = req.body;
    const response = await createOrganisationService(
      name,
      details,
      email,
      address,
      phone
    );
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = { createOrgansationController };
