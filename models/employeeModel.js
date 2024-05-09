const mongoose = require("mongoose");
const validator = require("validator");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    empId: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
      default: null,
      required: true,
      index: true,
      unique: true
    },
    designationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    unitId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true,
      index: true,
      default: true
    },
    isMeetingOrganiser: {
      type: Boolean,
      required: true,
      default: false
    },
    password: {
      type: String,
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

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
