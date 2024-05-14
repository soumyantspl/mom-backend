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
const listDepartmentService = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId,
        name: {$regex: searchKey, $options: 'i'},
        isActive: true,
      }
    : {
        organizationId,
        isActive: true,
      };

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Department.countDocuments(query);
  const departmentList = await Department.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return {
    totalCount,
    departmentList,
  };
};

module.exports = {
  createDepartmentService,
  editDepartmentService,
  existingDepartmentService,
  deleteDepartmentService,
  listDepartmentService,
};
