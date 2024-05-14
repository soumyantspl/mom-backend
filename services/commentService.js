const actionComments = require("../models/commentsModel");

const comments = async (data) => {
  const inputData = {
    actionId: data.actionId,
    userId: data.userId,
    commentDescription: data.commentDescription,
  };

  const commentData = new actionComments(inputData);
  const newComments = await commentData.save();
  return {
    data: newComments,
  };
};

module.exports = { comments };
