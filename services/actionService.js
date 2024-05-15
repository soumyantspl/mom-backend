const ActionComments = require("../models/commentsModel");

const Action = require("../models/actionsModel");
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
  const result = await Action.findOneAndUpdate(
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

const viewSingleAction = async (data) => {};

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

  const result = await Action.findOneAndUpdate(
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

module.exports = {
  comments,
  actionReassignRequest,
  viewSingleAction,
  viewActionComment,
  reAssignAction,
};
