const Department = require("../models/departmentModel");
const mongoose = require("mongoose");
const meetingService = require("./meetingService");

//FUCNTION TO CREATE DEPARTMENT
const createDepartmentService = async (name, organizationId) => {
  const newDepartment = new Department({
    name,
    organizationId,
  });
  return await newDepartment.save();
};
//FUCNTION TO EDIT DEPARTMENT
const editDepartmentService = async (id, userId, data, ipAddress = "1000") => {
  console.log(id, userId, data);
  const result = await Department.findByIdAndUpdate(
    id,
    {
      name: data.name,
    },
    {
      new: false,
    }
  );

  /////////////////////////////////////////////////
  console.log("result------------>", result);
  const inputKeys = Object.keys(data);
  console.log("inputKeys---------------", inputKeys);

  ////////////////////LOGER START
  const details = await meetingService.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  const logData = {
    moduleName: 'logMessages.Meeting.moduleName',
    userId,
    action: 'logMessages.Meeting.updateAttendees',
    ipAddress,
    details: details.join(" , "),
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
//  await logService.createLog(logData);

  ///////////////////// LOGER END

  return result;
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
