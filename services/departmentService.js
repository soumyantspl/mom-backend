const Department = require("../models/departmentModel");
const mongoose = require("mongoose");

//FUCNTION TO CREATE DEPARTMENT
const createDepartmentService = async (name, organizationId) => {
  const newDepartment = new Department({
    name,
    organizationId,
  });
  return await newDepartment.save();
};
//FUCNTION TO EDIT DEPARTMENT
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
//FUCNTION TO CHECK
const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  return isExist;
};
////FUCNTION TO DELETE DEPARTMENT
const deleteDepartmentService = async (id) => {
  const deletedDepartment = await Department.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
  return deletedDepartment;
};
//FUCNTION TO LIST DEPARTMENT
const listDepartmentService = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId,
        name: { $regex: searchKey, $options: "i" },
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
