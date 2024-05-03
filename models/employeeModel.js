const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // empId: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    // designation: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
    // department: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
    // unit: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
    // organisationId: {
    //   type: mongoose.Schema.ObjectId,
    //   required: true,
    // },
    // status: {
    //   type: Boolean,
    //   required: true,
    // },
    // isMeetingOrganiser: {
    //   type: Boolean,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    // otpData: [
    //   {
    //     otp: { type: Number, required: [true, "otp is required"] },
    //     otpResendCount: {
    //       type: Number,
    //       required: [true, "otpResendCount is required"],
    //     },
    //     otpResendTime: {
    //       type: Number,
    //       required: [true, "otpResendTime is required"],
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
