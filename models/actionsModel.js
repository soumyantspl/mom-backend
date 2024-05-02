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
      enum: ["HIGH", "NORMAL", "LOW"],
      required: true,
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
    reassigneRequestDetails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Action = mongoose.model("Employee", actionSchema);

module.exports = Action;
