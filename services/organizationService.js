const Organization = require("../models/organizationModel");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");

//FUNCTION TO- ORGANIZATION EXIST OR NOT
const existingOrganization = async (email) => {
  console.log("email-->", email);
  const DATA = await Organization.findOne({ email, isActive: true });
  console.log("DATA-->", DATA);
  return DATA;
};

//FUNCTION TO- CREATE ORGANIZATION
const createOrganizationService = async (
  name,
  details,
  email,
  address,
  phone
) => {
  const newOrganization = new Organization({
    name,
    details,
    email,
    address,
    phone,
  });
  return await newOrganization.save();
};

const viewOrganizationService = async (query, page, limit) => {
  let organisationData;
  console.log("limit", limit);

  if (Object.keys(query).length === 0) {
    organisationData = await Organization.find()
      .skip((page - 1) * limit)
      .limit(limit);
  } else {
    organisationData = await Organization.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
  }
  return organisationData;
};

const editOrganizationService = async (
  userId,
  id,
  data,
  ipAddress = "1000"
) => {
  const result = await Organization.findByIdAndUpdate(id, data, {
    new: false,
  });
  console.log("result---", result);
  ////////////////////LOGER START
  const inputKeys = Object.keys(result);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );

  const logData = {
    moduleName: logMessages.Organization.moduleName,
    userId,
    action: logMessages.Organization.editOrganization,
    ipAddress,
    details: details.join(" , "),
    organizationId: result._id,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return result;
};

module.exports = {
  createOrganizationService,
  viewOrganizationService,
  editOrganizationService,
  existingOrganization,
};
