const mongoose = require("mongoose");
const validator = require("validator");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    logo: {
      type: String,
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
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
