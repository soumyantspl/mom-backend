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
  const deletedDepartment = await Designations.findByIdAndDelete(id);
  return deletedDepartment;
};
const listDesignationService = async (limit, page) => {
  let designationData = await Designations.find({ isActive: true }).skip(
    (page - 1) * limit
  );
  return designationData;
};
module.exports = {
  createDesignationService,
  editDesignationService,
  deleteDesignationService,
  listDesignationService,
};
