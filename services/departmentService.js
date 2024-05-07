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
    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return false; // Department with given ID not found
    }

    existingDepartment.name = name;
    const updatedDepartment = await existingDepartment.save();
    return updatedDepartment;
  } catch (error) {
    throw error;
  }
};

const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  return !!isExist;
};
module.exports = {
  createDepartmentService,
  editDepartmentService,
  existingDepartmentService,
};
