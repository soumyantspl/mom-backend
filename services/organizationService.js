const Organization = require("../models/organizationModel");

const existingOrganization = async (email) => {
  console.log("email-->", email);
  const DATA = await Organization.findOne({ email, isActive: true });
  console.log("DATA-->", DATA);
  return DATA;
};
const createOrganizationService = async (
  name,
  details,
  email,
  address,
  phone
) => {
  const newOrganization = new Organization({
    name,
    details,
    email,
    address,
    phone,
  });
  return await newOrganization.save();
};

const viewOrganizationService = async (query, page, limit) => {
  let organisationData;
  console.log("limit", limit);

  if (Object.keys(query).length === 0) {
    organisationData = await Organization.find()
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    organisationData = await Organization.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
  }
  return organisationData;
};

const editOrganizationService = async (id, updateData) => {
  console.log("id-->", id);

  const updatedOrganization = await Organization.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
  return updatedOrganization;
};

module.exports = {
  createOrganizationService,
  viewOrganizationService,
  editOrganizationService,
  existingOrganization,
};
