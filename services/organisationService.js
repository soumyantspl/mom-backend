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

  const existingOrganisation = await Organisation.findOne({ email });
  if (existingOrganisation) {
    return {
      success: false,
      message: "Organisation with this mail is already available exist!",
    };
  }
  return await newOrganisation.save();
};

const viewOrganisationService = async (query, page = 1, limit = 10) => {
  let organisationData;
  if (Object.keys(query).length === 0) {
    organisationData = await Organisation.find()
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    organisationData = await Organisation.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
  }
  return organisationData;
};

const editOrganisationService = async (id, updateData) => {
  
 
  const findOrganisationData = await Organisation.findById(id);
  console.log("findOrganisationData-->", findOrganisationData);
  if (!findOrganisationData) {
    return { Success: false, message: "Organisation not found" };
  }
  Object.assign(findOrganisationData, updateData);

  const updatedOrganisation = await Organisation.save();
  return { Success: true, Organisation: updatedOrganisation };
};

module.exports = {
  createOrganisationService,
  viewOrganisationService,
  editOrganisationService,
};
