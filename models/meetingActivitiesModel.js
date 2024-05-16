const mongoose = require("mongoose");
const MeetingActivitiesSchema = new mongoose.Schema(
  {
    activityDetails: {
      type: String,
      required: true,
    },
    meetingId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      // required: true,
    },
    activityTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MeetingActivities = mongoose.model(
  "MeetingActivities",
  MeetingActivitiesSchema
);

module.exports = MeetingActivities;
