const Units = require("../models/unitModel");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");

const createUnit = async (userId, data, ipAddress = "1000") => {
  const unitDetails = await checkDuplicate(data.organizationId, data.name);
  if (!unitDetails) {
    const newData = {
      name: data.name,
      address: data.address,
      organizationId: data.organizationId,
    };
    console.log("newData", newData);
    const unitData = new Units(newData);
    const result = await unitData.save();
    console.log("UnitData", result);

    ////////////////////LOGER START
    console.log("result------------>", result);
    const logData = {
      moduleName: logMessages.Unit.moduleName,
      userId,
      action: logMessages.Unit.createUnit,
      ipAddress,
      details: logMessages.Unit.createUnitDetails.concat(result.organizationId),
      organizationId: result.organizationId,
    };
    console.log("logData-------------------", logData);
    await logService.createLog(logData);
    ///////////////////// LOGER END

    return result;
  }
  return false;
};

const editUnit = async (userId, id, data, ipAddress = "1000") => {
  const result = await Units.findByIdAndUpdate({ _id: id }, data, {
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
    moduleName: logMessages.Unit.moduleName,
    userId,
    action: logMessages.Unit.editUnit,
    ipAddress,
    details: details.join(" , "),
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);
  ///////////////////// LOGER END
  return result;
};

const deleteUnit = async (userId, id, data, ipAddress = "1000") => {
  console.log("id--->>", id);
  const result = await Units.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: false }
  );

  ////////////////////LOGER START
  const logData = {
    moduleName: logMessages.Unit.moduleName,
    userId,
    action: logMessages.Unit.deleteUnit,
    ipAddress,
    details: result.organizationId + logMessages.Unit.deleteUnit,
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);
  ///////////////////// LOGER END
  return result;
};

const listUnit = async (userId, bodyData, queryData) => {
  const { organizationId, searchKey } = bodyData;
  const { order } = queryData;
  console.log("organizationId-->", organizationId);
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

  const totalCount = await Units.countDocuments(query);
  const unitData = await Units.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return { totalCount, unitData };
};
const checkDuplicate = async (organizationId, name) => {
  return await Units.findOne(
    { organizationId, name, isActive: true },
    { organizationId: 1, name: 1 }
  );
};

module.exports = {
  createUnit,
  editUnit,
  deleteUnit,
  listUnit,
};
