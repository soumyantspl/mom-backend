const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mode: {
      enum: ["VIRTUAL", "PHYSICAL"],
      required: true,
    },
    locationDetails: {
      location: {
        type: String
      },
      isMeetingRoom: {
        type: Boolean,
        required: true,
      },
      roomId:{
        type: mongoose.Schema.ObjectId
      }
    },
    link: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    fromTime: {
      type: String
    },
    toTime: {
      type: String
    },
    step:{
      enum: [1,2,3],
      required: true
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

const Meetings = mongoose.model("meetings", meetingSchema);

module.exports = Meetings;
