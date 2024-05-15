const mongoose = require("mongoose");
const minutesSchema = new mongoose.Schema(
  {
    description : {
      type: String,
      required: true,
    },
    priority: {
      type: String,
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
    assignedUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    reassignedUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    reassigneRequestDetails: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        dateTime: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        requestDetails: {
          type: String,
        },
      },
    ],
    reassignDetails: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        dateTime: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        reAssignReason: {
          type: String,
        },
      },
    ],
    isComplete: {
      type: Boolean,
      //required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Minutes = mongoose.model("Minutes", minutesSchema);

module.exports = Minutes;
