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
  const findOrganizationData = await Organization.findById(id);
  if (!findOrganizationData) {
    return { Success: false, message: "Organisation ID not found" };
  }
  Object.assign(id, updateData);
  const updateQuery = { $set: updateData };
  const updatedOrganization = await Organization.findByIdAndUpdate(
    id,
    updateQuery,
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
