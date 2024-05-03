const mongoose = require("mongoose");
const validator = require("validator");
const otpLogsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
      default: null,
      required: true,
      index: true,
    },
    otp: {
      type: Number,
      required: true,
      index: true,
    },
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      index: true,
    },
    expiryTime: {
      required: true,
    },
    otpResendTime: {},
    otpResendCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const otpLogs = mongoose.model("otpLogs", otpLogsSchema);

module.exports = otpLogs;
