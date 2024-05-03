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
    },
  },
  {
    timestamps: true,
  }
);

const departmentModel = mongoose.model(
  "departmentModel",
  departmentModelSchema
);

module.exports = departmentModel;
