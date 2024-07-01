const mongoose = require("mongoose");
const ActionActivitiesSchema = new mongoose.Schema(
  {
    activityDetails: {
      type: String,
    },
    activityTitle: {
      type: String,
      required: true,
    },
    minuteId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActionActivities = mongoose.model(
  "ActionActivities",
  ActionActivitiesSchema
);

module.exports = ActionActivities;
