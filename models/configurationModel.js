const mongoose = require("mongoose");
const configurationSchema = new mongoose.Schema(
  {
    amendmentRequestTime: {
      // IN HOURS
      type: Number,
      required: true,
      default: 0,
    },
    acceptanceRejectionEndtime: {
      // IN HOURS
      type: Number,
      required: true,
      default: 0,
    },
    mettingReminders: {
      hours: { type: Number, required: true, default: 0 },
      minutes: { type: Number, required: true, default: 0 },
    },
    chaseOfAction: {
      // IN DAYS
      type: Number,
      required: true,
      default: 0,
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      index: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Configuration = mongoose.model("configurations", configurationSchema);

module.exports = Configuration;
