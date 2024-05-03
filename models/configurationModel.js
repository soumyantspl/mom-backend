const mongoose = require("mongoose");
const configurationSchema = new mongoose.Schema(
  {
    amendmentRequestTime: {
      type: Number,
      required: true,
    },
    acceptanceRejectionEndtime: {
      type: Number,
      required: true,
    },
    mettingReminders: {
      hours: { type: number, required: true },
      minutes: { type: number, required: true },
    },
    chaseOfAction: {
      type: Number,
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

const Configuration = mongoose.model("Configuration", configurationSchema);

module.exports = Configuration;
