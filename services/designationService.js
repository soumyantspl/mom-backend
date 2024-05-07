const Designations = require("../models/designationModel");

const createDesignationService = async (name, organizationId) => {
  const newDesignation = new Designations({
    name,
    organizationId,
  });
  return await newDesignation.save();
};

const editDesignationService = async (id, name) => {
  const existingDepartment = await Designation.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return existingDepartment;
};

const deleteDesignationService = async (id) => {
  const deletedDepartment = await Designation.findByIdAndDelete(id);
  return deletedDepartment;
};
const listDesignationService = async () => {
  const designation = await Designations.find();
  return designation;
};
module.exports = {
  createDesignationService,
  editDesignationService,
  deleteDesignationService,
  listDesignationService,
};
