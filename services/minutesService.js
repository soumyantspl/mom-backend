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

const createMinutes = async (data) => {
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

  
  const inputData = {
    userId: userId,
    organisationId: data.organisationId,
    meetingId: data.meetingId,
    minutesDescription: data.minutesDescription,
    dueDate: data.dueDate,
    priority: data.priority,
    responsiblePerson: data.responsiblePerson,
    isAction: data.isAction,
  };
  const minuteData = new Minutes(inputData);
  const newMinutes = await minuteData.save();

  return {
    data: newMinutes,
  };
};

module.exports = {
  acceptRejectMinutes,
  createMinutes,
};
