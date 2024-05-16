const ActionComments = require("../models/commentsModel");
const Minutes = require("../models/minutesModel");
const employeeService = require("./employeeService");
const ObjectId = require("mongoose").Types.ObjectId;

//FUCNTION TO CREATE COMMENTS
const comments = async (data) => {
  const inputData = {
    actionId: data.actionId,
    userId: data.userId,
    commentDescription: data.commentDescription,
  };

  const commentData = new ActionComments(inputData);
  const newComments = await commentData.save();
  return {
    data: newComments,
  };
};

/**FUNC-VIEW ACTION COMMENT */
const viewActionComment = async (data) => {
  const viewActionCommentList = await ActionComments.find(data);
  return {
    viewActionCommentList,
  };
};

/**FUNC- ACTION REASSIGN REQUEST */
const actionReassignRequest = async (data, id) => {
  console.log(data, id);
  const result = await Minutes.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },

    {
      $push: { reassigneRequestDetails: data },
    }
  );
  console.log(result);
  return result;
};

/**FUNC- TO VIEW ALL ACTIONS */
const viewAllAction = async (bodyData, queryData) => {
  console.log("iiiiiiiiiiiiiiiiiiiiiiii", bodyData, queryData);
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId: new ObjectId(organizationId),
        description: { $regex: searchKey, $options: "i" },
        isActive: true,
        isAction: true,
      }
    : {
        organizationId: new ObjectId(organizationId),
        isActive: true,
        isAction: true,
      };
  console.log("query--------------", query);
  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Minutes.countDocuments(query);
  const actionDatas = await Minutes.aggregate([
    {
      $match: query,
    },

    {
      $lookup: {
        from: "employees",
        localField: "assignedUserId",
        foreignField: "_id",
        as: "userDetail",
      },
    },
    {
      $project: {
        description: 1,
        isComplete: 1,
        dueDate: 1,
        userDetail: {
          name: 1,
          _id: 1,
        },
      },
    },
    { $unwind: "$userDetail" },
  ])
    .sort({ createdAt: parseInt(order) })
    .skip(skip)
    .limit(limit);

  return {
    totalCount,
    actionDatas,
  };
};

/**FUNC- TO VIEW ALL USER ACTIONS */
const viewUserAllAction = async (bodyData, queryData, userId) => {
  console.log("iiiiiiiiiiiiiiiiiiiiiiii", bodyData, queryData);
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId: new ObjectId(organizationId),
        description: { $regex: searchKey, $options: "i" },
        isActive: true,
        isAction: true,
        assignedUserId: new ObjectId(userId),
      }
    : {
        organizationId: new ObjectId(organizationId),
        isActive: true,
        isAction: true,
        assignedUserId: new ObjectId(userId),
      };
  console.log("query--------------", query);
  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Minutes.countDocuments(query);
  const actionDatas = await Minutes.aggregate([
    {
      $match: query,
    },

    {
      $lookup: {
        from: "employees",
        localField: "assignedUserId",
        foreignField: "_id",
        as: "userDetail",
      },
    },
    {
      $project: {
        description: 1,
        isComplete: 1,
        dueDate: 1,
        userDetail: {
          name: 1,
          _id: 1,
        },
      },
    },
    { $unwind: "$userDetail" },
  ])
    .sort({ createdAt: parseInt(order) })
    .skip(skip)
    .limit(limit);

  return {
    totalCount,
    actionDatas,
  };
};

const reAssignAction = async (data, id) => {
  console.log(data);
  let userId = data.userId;
  if (data.isNewUser) {
    const empData = await employeeService.createAttendee(
      data.name,
      data.email,
      data.organizationId
    );
    if (empData.isDuplicate) {
      return empData;
    }
    userId = empData._id;
  }

  const reassignDetails = {
    userId,
    reAssignReason: data.reAssignReason,
  };
  console.log("reassignDetails------------", reassignDetails);
  console.log("userId------------", userId);

  const result = await Minutes.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },

    {
      $push: { reassignDetails },
      assignedUserId: new ObjectId(userId),
      priority: data.priority,
    }
  );
  console.log("result-------------", result);
  return result;
};

/**FUNC- TO VIEW SINGLE ACTION DETAILS */
const viewSingleAction = async (id) => {
  console.log("iiiiiiiiiiiiiiiiiiiiiiii", id);

  const actionData = await Minutes.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },

    {
      $lookup: {
        from: "meetings",
        localField: "meetingId",
        foreignField: "_id",
        as: "meetingDetail",
      },
    },
    {
      $lookup: {
        from: "agendas",
        localField: "agendaId",
        foreignField: "_id",
        as: "agendaDetail",
      },
    },
    {
      $project: {
        description: 1,
        isComplete: 1,
        dueDate: 1,
        priority: 1,
        agendaDetail: {
          title: 1,
          //   date:1,
          _id: 1,
        },
        meetingDetail: {
          title: 1,
          date: 1,
          _id: 1,
        },
      },
    },
    { $unwind: "$agendaDetail" },
    { $unwind: "$meetingDetail" },
  ]);

  return actionData;
};

/**FUNC- UPDATE ACTION */
const updateAction = async (id, data) => {
  console.log("----------------------3333344", data);
  console.log("----------------------33333", id);
  const action = await Minutes.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    data,
    { new: true }
  );
  console.log("action-----------------------", action);
  return action;
};

module.exports = {
  comments,
  actionReassignRequest,
  viewSingleAction,
  viewActionComment,
  reAssignAction,
  viewAllAction,
  viewUserAllAction,
  updateAction,
};
