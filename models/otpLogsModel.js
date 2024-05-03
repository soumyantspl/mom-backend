const mongoose = require("mongoose");
const otpLogsSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const otpLogs = mongoose.model("otpLogs", otpLogsSchema);

module.exports = otpLogs;
