const ActionComments = require("../models/commentsModel");
const Action = require("../models/actionsModel");
const ObjectId = require("mongoose").Types.ObjectId;
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

const viewActionComment = async (data) => {};
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

module.exports = { comments, actionReassignRequest };
