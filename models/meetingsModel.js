const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mode: {
      enum: ["VIRTUAL", "PHYSICAL"],
    },
    location: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    attendees: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          required: [true, "id is required"],
        },
        rsvp: {
          enum: ["YES", "NO", "WAITING"],
        },
        
      },
    ],
    roomId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    status: {
      enum: ["closed", "sceduled", "rescheduled", "canceled", "due"],
    },
    logs: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meetings = mongoose.model("Meetings", meetingSchema);

module.exports = Meetings;
