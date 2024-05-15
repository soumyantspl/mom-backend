const ActionComments = require("../models/commentsModel");


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

const viewActionComment = async (data) => {
  const viewActionCommentList = await ActionComments.find(data);
  return {
    viewActionCommentList,
  };
};

module.exports = { comments, viewActionComment };
