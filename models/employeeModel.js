const mongoose = require("mongoose");
const validator = require("validator");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    empId: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
      default: null,
      required: true,
      index: true
    },
    designation: {
      type: mongoose.Schema.ObjectId,
     
    },
    department: {
      type: mongoose.Schema.ObjectId,
     
    },
    unit: {
      type: mongoose.Schema.ObjectId,
      
    },
    organisationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      index: true
    },
    isMeetingOrganiser: {
      type: Boolean,
      required: true,
      default:false
    },
    password: {
      type: String
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

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
