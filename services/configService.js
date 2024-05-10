const Config = require("../models/configurationModel");

/**FUNC- CREATE CONFIGURATION */
const createConfig = async (data) => {
  console.log("----------------------33333", data);
  //  const configDetails = await checkDuplicateEntry(data.organizationId);
  //   User.findOneAndUpdate({age: {$gte:5} },
  //     {name:"Anuj"}, null, function (err, docs) {
  const isConfigDetailsExists = await Config.findOneAndUpdate(
    { organizationId: data.organizationId },
    data,
    {
      new: true,
    }
  );
  console.log("isConfigDetailsExists--------------", isConfigDetailsExists);
  if (!isConfigDetailsExists) {
    const inputData = {
      amendmentRequestTime: data.amendmentRequestTime,
      acceptanceRejectionEndtime: data.acceptanceRejectionEndtime,
      mettingReminders: data.mettingReminders,
      chaseOfAction: data.chaseOfAction,
      organizationId: data.organizationId,
    };
    const configData = new Config(inputData);
    const newConfig = await configData.save();
    console.log("newConfig----------------", newConfig);

    return {
      data: newConfig,
      isUpdated: false,
    };
  }
  return {
    data: isConfigDetailsExists,
    isUpdated: true,
  };
};

/**FUNC- TO VERIFY DUPLICATE CONFIGURATION */
const checkDuplicateEntry = async (organizationId) => {
  return await Config.findOne(
    { organizationId, isActive: true },
    { _id: 1, title: 1, organisationId: 1 }
  );
};

/**FUNC- EDIT CONFIGURATION */
const editConfig = async (data, id) => {
  console.log("----------------------3333344", data);
  console.log("----------------------33333", id);
  const room = await Config.findByIdAndUpdate({ _id: id }, data, { new: true });
  console.log("room-----------------------", room);
  return room;
};

/**FUNC- TO VIEW CONFIGURATION */
const viewConfig = async (organizationId) => {
  return await Config.findOne({ organizationId, isActive: true });
};

/**FUNC- DELETE CONFIGURATION */
const deleteConfig = async (id) => {
  console.log("----------------------33333", id);
  const config = await Config.findByIdAndUpdate(
    { _id: id },
    { isActive: false }
  );
  console.log("config-----------------------", config);
  return config;
};

module.exports = {
  createConfig,
  editConfig,
  viewConfig,
  deleteConfig,
};
