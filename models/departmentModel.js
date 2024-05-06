const mongoose = require("mongoose");
const departmentModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organisationId: {
      type: mongoose.Schema.ObjectId,
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

const Department = mongoose.model(
  "departmentModel",
  departmentModelSchema
);

module.exports = Department;
