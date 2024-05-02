const mongoose = require("mongoose");
const minutesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      enum: ["HIGH", "NORMAL", "LOW"],
      required: true,
    },
    attendees: [
      {
        createdById: {
          type: mongoose.Schema.ObjectId,
          required: [true, ""],
        },
        status: {
          type: Boolean,
          required: true,
        },
      },
    ],
    responsiblePerson: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    reAssignedTo: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    amendmentDetails: [
      {
        createdById: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        details: {
          type: String,
          required: true,
        },
        status: {
          type: Boolean,
          required: true,
        },
      },
    ],
    agendaId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    meetingId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Minutes = mongoose.model("Minutes", minutesSchema);

module.exports = Minutes;
