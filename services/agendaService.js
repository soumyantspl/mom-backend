const Agenda = require("../models/agendaModel");

const createAgenda = async (data) => {
  const inputData = {
    organizationId: data.organizationId,
    meetingId: data.meetingId,
    title: data.title,
    topic: data.topic,
    timeLine: parseFloat(data.timeLine).toFixed(2),
  };
  const agendaData = new Agenda(inputData);
  const newAgenda = await agendaData.save();
  return {
    data: newAgenda,
  };
};
module.exports = {
  createAgenda,
};
