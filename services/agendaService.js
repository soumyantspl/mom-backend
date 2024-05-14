const Agenda = require("../models/agendaModel");

const createAgenda = async (data) => {
  console.log('data--------------123',data)
  const inputData=data.map((item)=>{
    item.timeLine=parseFloat(item.timeLine).toFixed(2)
    return item;
  })
  const newAgenda = await Agenda.insertMany(inputData);
  console.log("newAgenda--------------",newAgenda)
  return {
    data: newAgenda,
  };
};
module.exports = {
  createAgenda,
};
