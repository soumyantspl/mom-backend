const Designations = require("../models/designationModel");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");
const ObjectId = require("mongoose").Types.ObjectId;

//FUCNTION TO CREATE DESIGNATION
const createDesignationService = async (userId, data, ipAddress = "1000") => {
  const result = new Designations({
    name: data.name,
    organizationId: data.organizationId,
  });

  ////////////////////LOGER START
  const inputKeys = Object.keys(result);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  const logData = {
    moduleName: logMessages.Designation.moduleName,
    userId,
    action: logMessages.Designation.createDesignation,
    ipAddress,
    details: "N/A",
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return await result.save();
};

//FUCNTION TO CREATE DESIGNATION
const editDesignationService = async (userId, id, data, ipAddress = "1000") => {
  const result = await Designations.findByIdAndUpdate(
    id,
    {
      name: data.name,
    },
    {
      new: false,
    }
  );
  console.log("result", result);
  ////////////////////LOGER START
  const inputKeys = Object.keys(data);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  const logData = {
    moduleName: logMessages.Designation.moduleName,
    userId,
    action: logMessages.Designation.editDesignation,
    ipAddress,
    details: details.join(" , "),
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return result;
};

//FUCNTION TO DELETE DESIGNATION
const deleteDesignationService = async (userId, data, ipAddress = "1000") => {
  const result = await Designations.findByIdAndUpdate(
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
    moduleName: logMessages.Designation.moduleName,
    userId,
    action: logMessages.Designation.deleteDesignation,
    ipAddress,
    details: "N/A",
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return result;
};

//FUCNTION TO LIST DESIGNATION
const listDesignationService = async (bodyData, queryData) => {
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
  const totalCount = await Designations.countDocuments(query);
  const designationList = await Designations.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return {
    totalCount,
    designationList,
  };
};
module.exports = {
  createDesignationService,
  editDesignationService,
  deleteDesignationService,
  listDesignationService,
};
