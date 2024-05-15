const Agenda = require("../models/agendaModel");

const createAgendaForMeeting = async (data) => {
  console.log("data--------------123", data);
  const inputData = data.map((item) => {
    item.timeLine = parseFloat(item.timeLine).toFixed(2);
    return item;
  });
  const newAgenda = await Agenda.insertMany(inputData);
  console.log("newAgenda--------------", newAgenda);

  const agendaIds = newAgenda.map((item) => {
    return item._id;
  });
  console.log(agendaIds);

  console.log("newAgenda-------------22-", newAgenda);
  return agendaIds;
};
module.exports = {
  createAgendaForMeeting,
};
