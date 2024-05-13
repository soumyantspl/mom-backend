const Agenda = require("../models/agendaModel");

const createAgenda = async (data) => {
  console.log('data--------------123',data)
  const inputData = {
    organizationId: data.organizationId,
    meetingId: data.meetingId,
    title: data.title,
    topic: data.topic,
    timeLine: parseFloat(data.timeLine).toFixed(2),
  };
  //const agendaData = new Agenda(data);
  const newAgenda = await Agenda.insertMany(data);
  console.log("newAgenda--------------",newAgenda)
  return {
    data: newAgenda,
  };
};
module.exports = {
  createAgenda,
};
