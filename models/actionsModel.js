const mongoose = require("mongoose");
const actionSchema = new mongoose.Schema(
  {
    heldOn: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    agenda: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },

    priority: {
      type: String,
      enum: ["HIGH", "NORMAL", "LOW"],
      default: "NORMAL",
    },
    actionActivities: [],
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    meetingId: {
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
  },
  {
    timestamps: true,
  }
);

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
