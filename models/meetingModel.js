const mongoose = require("mongoose");
const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["VIRTUAL", "PHYSICAL"],
      default: "PHYSICAL",
    },
    locationDetails: {
      location: {
        type: String,
      },
      isMeetingRoom: {
        type: Boolean,
        required: true,
      },
      roomId: {
        type: mongoose.Schema.ObjectId,
      },
    },
    link: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    fromTime: {
      type: String,
    },
    toTime: {
      type: String,
    },
    step: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    attendees: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          required: [true, "id is required"],
        },
        rsvp: {
          type: String,
          enum: ["YES", "NO", "WAITING"],
          default: "WAITING"
        },
      },
    ],
    // roomId: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
    meetingStatus: {
      status: {
        type: String,
        enum: ["closed", "sceduled", "rescheduled", "canceled", "due"],
        default: "due",
      },
      remarks: { type: String, required: false },
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    agendaIds: [{
      type:  mongoose.Schema.ObjectId
  }]
    // logs: [
    //   {
    //     id: {
    //       type: mongoose.Schema.ObjectId,
    //       required: true,
    //     },
    //     action: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Meetings = mongoose.model("meetings", meetingSchema);

module.exports = Meetings;
