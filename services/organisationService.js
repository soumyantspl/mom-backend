const Organisation = require("../models/organisationModel");

const createOrganisationService = async (
  name,
  details,
  email,
  address,
  phone
) => {
  const newOrganisation = new Organisation({
    name,
    details,
    email,
    address,
    phone,
  });
  return await newOrganisation.save();
};

const viewOrganisationService = async () => {
    
};

module.exports = {
  createOrganisationService,
};
