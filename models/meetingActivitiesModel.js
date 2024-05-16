const mongoose = require("mongoose");
const MeetingActivitiesSchema = new mongoose.Schema({
  activitiesDetails: {
    type: String,
    required: true,
  },
  meetingId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  actionDetails: {
    type: String,
  },
});

const MeetingActivities = mongoose.model(
  "MeetingActivities",
  MeetingActivitiesSchema
);

module.exports = { MeetingActivities };
