const mongoose = require("mongoose");
const agendaSchema = new mongoose.Schema(
  {
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    meetingId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    timeLine: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agenda = mongoose.model("Agenda", agendaSchema);

module.exports = Agenda;
