const Logs = require("../models/logsModel");

const createLog = async (data) => {
  const logData = await Logs.findOne({}).sort({ createdAt: -1 });
  data.serialNumber = logData ? logData.serialNumber + 1 : 1;
  const newLogs = new Logs(data);
  return await newLogs.save();
};

const viewLogs = async  (bodyData, queryData) => {
  
    const { order } = queryData;
    const { organizationId, searchKey } = bodyData;
    let query = searchKey
      ? {
          organizationId,
          details: searchKey
        }
      : {
          organizationId
        };
  
    const limit = parseInt(queryData.limit);
    const skip = (parseInt(queryData.page) - 1) * parseInt(limit);
    const totalCount = await Logs.countDocuments(query);
    // const logsDatas = await Logs.find(query)
    //   .sort({ createdAt: parseInt(order) })
    //   .limit(limit)
    //   .skip(skip);
  console.log(query)
      const logsDatas = await Logs.aggregate([
        {
          $match:query
        },
        {
          $lookup: {
            from: "employees",
            localField: "userId",
            foreignField: "_id",
            as: "userDetail",
          },
        },
        // {
        //   $project: {
        //     userDetail: {
        //       name: 1,
        //       _id: 1,
        //     },
        //   },
        // },
        { $unwind: "$userDetail" },
      ])
    //   .sort({ createdAt: parseInt(order) })
    //     .limit(limit)
    //     .skip(skip);
    return {
      totalCount,
      logsDatas,
    };
  };

module.exports = {
  createLog,viewLogs
};
