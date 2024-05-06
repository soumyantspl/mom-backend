const mongoose = require("mongoose");
const designationSchema = new mongoose.Schema(
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

const Designation = mongoose.model("Designation", designationSchema);

module.exports = Designation;
