const logChanges = async (
  inputKeys,
  result,
  data,
  userId,
  logMessages,
  logService,
  ipAddress
) => {
    let details = [];
    let finalObject = {};
  
    inputKeys.forEach((key) => {
      finalObject[key] = {
        oldValue: null,
        newValue: null,
      };
  
      if (key === customField) {
        const attendee = result.attendees.find((item) => item.id.toString() === userId);
        if (attendee) {
          finalObject[key].oldValue = customFieldHandler(attendee);
        }
      } else {
        finalObject[key].oldValue = result[key];
      }
  
      finalObject[key].newValue = data[key];
      details.push(`${key} changed from ${finalObject[key].oldValue} to ${finalObject[key].newValue}`);
      delete finalObject[key];
    });
  
    const logData = {
      moduleName: moduleName || logMessages.Meeting.moduleName,
      userId,
      action: action || logMessages.Meeting.updateAttendees,
      ipAddress,
      details: details.join(" , "),
      organizationId: result[organizationIdKey] || result.organizationId,
    };
  
    await logService.createLog(logData);
};

module.exports = logChanges;
