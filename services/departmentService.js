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
  const existingDepartment = await Department.findByIdAndUpdate(
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
const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  return isExist;
};

const deleteDepartmentService = async (id) => {
  const deletedDepartment = await Department.findByIdAndDelete(id);
  return deletedDepartment;
};
const listDepartmentService = async () => {
  const departments = await Department.find();
  return departments;
};
module.exports = {
  createDepartmentService,
  editDepartmentService,
  existingDepartmentService,
  deleteDepartmentService,
  listDepartmentService,
};
