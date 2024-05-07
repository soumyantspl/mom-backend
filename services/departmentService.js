const Department = require("../models/departmentModel");
const mongoose = require("mongoose");

const createDepartmentService = async (name, organizationId) => {
  const newDepartment = new Department({
    name,
    organizationId,
  });
  return await newDepartment.save();
};
const editDepartmentService = async (id, name) => {
  try {
    console.log(id, name);
    const existingDepartment = await Department.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      {
        new: true,
      }
    );
    console.log("existingDepartment", existingDepartment);
    return existingDepartment;
  } catch (error) {
    throw error;
  }
};
const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  return isExist;
};

module.exports = {
  createDepartmentService,
  editDepartmentService,
  existingDepartmentService,
};
