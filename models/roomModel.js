const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: null,
      // required: true
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("meetingrooms", roomSchema);

module.exports = Rooms;
