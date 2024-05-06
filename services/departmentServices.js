const Department = require("../models/departmentModel");

const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  if (!isExist) {
    return false;
  }
};

const createDepartmentService = async (name, organizationId) => {
  const newDepartment = new Department({
    name,
    organizationId,
  });
  return await newDepartment.save();
};


module.exports = {
    existingDepartmentService,
    createDepartmentService
}