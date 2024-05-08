const mongoose = require("mongoose");
const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
