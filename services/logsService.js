const Logs = require("../models/logsModel");
const ObjectId = require("mongoose").Types.ObjectId;

/**FUNC- CREATE LOG */
const createLog = async (data) => {
  const logData = await Logs.findOne({}).sort({ createdAt: -1 });
  data.serialNumber = logData ? logData.serialNumber + 1 : 1;
  const newLogs = new Logs(data);
  return await newLogs.save();
};

/**FUNC- LIST ALL LOG */
const viewLogs = async (bodyData, queryData) => {
  const { order } = queryData;
  const { searchKey } = bodyData;
  const organizationId = new ObjectId(bodyData.organizationId);
  let query = searchKey
    ? {
        organizationId,
        details: searchKey,
      }
    : {
        organizationId,
      };

  const limit = parseInt(queryData.limit);
  const skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Logs.countDocuments(query);

  console.log("query", query);
  const logsDatas = await Logs.aggregate([
    {
      $match: query,
    },
   
    {
      $lookup: {
        from: "employees",
        localField: "userId",
        foreignField: "_id",
        as: "userDetail",
      },
    },
    {
      $project: {
        moduleName: 1,
        serialNumber: 1,
        action: 1,
        ipAddress: 1,
        details: 1,
        createdAt: 1,
        updatedAt: 1,
        userDetail: {
          name: 1,
          _id: 1,
        },
      },
    },
    { $unwind: "$userDetail" }
  ])
  .sort({ createdAt: parseInt(order) })
  .skip(skip)
    
      .limit(limit)
      
  return {
    totalCount,
    logsDatas,
  };
};

module.exports = {
  createLog,
  viewLogs,
};
