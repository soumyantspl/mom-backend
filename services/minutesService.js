const Minutes = require("../models/minutesModel");

const acceptRejectMinutes = async (data) => {
  const result = await Minutes.findOneAndUpdate(
    {
      "attendees.id": data.userId,
      _id: data.id,
    },
    {
      $set: { "attendees.$.status": data.status },
    }
  );
  console.log(result);
  return result;
};

const createMinutes = (data) => {
  const inputData = {

  };
};

module.exports = {
  acceptRejectMinutes,
};
