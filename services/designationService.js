const Designation = require("../models/designationModel");

const createDesignation = async (name, organisationId) => {
  const designation = await Designation.create({
    name,
    organisationId,
  });
  return designation;
};


module.exports = {
  createDesignation,
};

