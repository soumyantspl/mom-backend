const Department = require("../models/departmentModel");
const mongoose = require("mongoose");
const meetingService = require("./meetingService");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");
const ObjectId = require("mongoose").Types.ObjectId;

//FUCNTION TO CREATE DEPARTMENT
const createDepartmentService = async (userId, data, ipAddress = "1000") => {
  const departmentDetails = await checkDuplicate(
    data.organizationId,
    data.name
  );
  if (!departmentDetails) {
    const newDepartment = new Department({
      name: data.name,
      organizationId: data.organizationId,
    });
    console.log("name---", data.name);
    console.log("id---", data.organizationId);
    ////////////////////LOGER START
    const inputKeys = Object.keys(newDepartment);
    console.log("inputKeys", inputKeys);
    const logData = {
      moduleName: logMessages.Department.moduleName,
      userId,
      action: logMessages.Department.createDepartment,
      ipAddress,
      details: "N/A",
      organizationId: data.organizationId,
    };
    console.log("logData--->", logData);
    await logService.createLog(logData);
    ///////////////////// LOGER END
    return await newDepartment.save();
  }
  return false;
};

//FUCNTION TO EDIT DEPARTMENT
const editDepartmentService = async (userId, id, data, ipAddress = "1000") => {
  console.log(userId, data);
  const departmentDetails = await checkDuplicate(
    data.organizationId,
    data.name
  );

  if (departmentDetails) {
    if (
      departmentDetails.name === data.name &&
      departmentDetails._id.toString() !== id
    ) {
      return {
        isDuplicate: true,
      };
    } else if (
      departmentDetails.name === data.name &&
      departmentDetails._id.toString() == id
    ) {
      const result = await Department.findByIdAndUpdate({ _id: id }, data, {
        new: false,
      });
      ////////////////////LOGER START
      const inputKeys = Object.keys(data);
      const details = await commonHelper.generateLogObject(
        inputKeys,
        result,
        userId,
        data
      );
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
      //   ///////////////////// LOGER END
      return {
        isDuplicate: false,
      };
    } else {
      return {
        isDuplicate: false,
      };
    }
  } else {
    const result = await Department.findByIdAndUpdate({ _id: id }, data, {
      new: false,
    });
    ////////////////////LOGER START
    const inputKeys = Object.keys(data);
    const details = await commonHelper.generateLogObject(
      inputKeys,
      result,
      userId,
      data
    );
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
    return {
      isDuplicate: false,
    };
  }
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

const checkDuplicate = async (organizationId, name) => {
  return await Department.findOne(
    { organizationId, name, isActive: true },
    { organizationId: 1, name: 1 }
  );
};
module.exports = {
  createDepartmentService,
  editDepartmentService,
  existingDepartmentService,
  deleteDepartmentService,
  listDepartmentService,
};
