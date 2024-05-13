const mongoose = require("mongoose");
const agendaSchema = new mongoose.Schema(
  {
    organizationId: {
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
      // required: true,
    },
    timeLine: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Agenda = mongoose.model("agenda", agendaSchema);

module.exports = Agenda;
