const Department = require("../models/departmentModel");
const mongoose = require("mongoose");
const meetingService = require("./meetingService");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");
const ObjectId = require("mongoose").Types.ObjectId;

//FUCNTION TO CREATE DEPARTMENT
const createDepartmentService = async (userId, data, ipAddress = "1000") => {
  const newDepartment = new Department({
    name: data.name,
    organizationId: data.id,
  });
  console.log("name---", data.name);
  console.log("id---", data.id);
  ////////////////////LOGER START
  const inputKeys = Object.keys(newDepartment);
  console.log("inputKeys", inputKeys);
  const logData = {
    moduleName: logMessages.Department.moduleName,
    userId,
    action: logMessages.Department.createDepartment,
    ipAddress,
    details: "N/A",
    organizationId: data.id,
  };
  console.log("logData--->", logData);
  await logService.createLog(logData);
  ///////////////////// LOGER END
  return await newDepartment.save();
};

//FUCNTION TO EDIT DEPARTMENT
const editDepartmentService = async (userId, id, data, ipAddress = "1000") => {
  console.log(userId, data);
  const result = await Department.findByIdAndUpdate(
    id,
    {
      name: data.name,
    },
    {
      new: false,
    }
  );
  ////////////////////LOGER START
  console.log("result------------>", result);
  const inputKeys = Object.keys(data);
  console.log("inputKeys---------------", inputKeys);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  console.log("details", details);
  const logData = {
    moduleName: logMessages.Department.moduleName,
    userId,
    action: logMessages.Department.editDepartment,
    ipAddress,
    details: details.join(" , "),
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END

  return result;
};

//FUCNTION TO CHECK
const existingDepartmentService = async (organizationId) => {
  const isExist = await Department.findById(organizationId);
  return isExist;
};
////FUCNTION TO DELETE DEPARTMENT
const deleteDepartmentService = async (userId, data, ipAddress = "1000") => {
  const result = await Department.findByIdAndUpdate(
    { _id: data.id },
    { isActive: false },
    { new: true }
  );

  ////////////////////LOGER START
  const inputKeys = Object.keys(result);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  const logData = {
    moduleName: logMessages.Department.moduleName,
    userId,
    action: logMessages.Department.deleteDepartment,
    ipAddress,
    details: logMessages.Department.details,
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END

  return result;
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
