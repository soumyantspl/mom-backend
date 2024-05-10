const mongoose = require("mongoose");
const validator = require("validator");
const signInLogsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
      required: true,
      index: true
    },
    ipAddress: {
      type: String,
      required: true,
    },
    isLoggedinSuccess: {
      type: Boolean,
      required: true,
    },
    isIpAddressBlocked: {
      type: Boolean,
      required: true,
    },
    loginAttempt: {
      type: Number,
      required: true,
    },
    wrongLoginAttemptTime: {
      type: Date,
      required: true,
    },
    // organizationId: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const signInLogs = mongoose.model("signInLogs", signInLogsSchema);

module.exports = signInLogs;
