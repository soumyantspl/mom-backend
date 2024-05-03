const mongoose = require("mongoose");
const rolesSchema = new mongoose.Schema(
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
    amendmentDetails: {
      read: {
        type: Boolean,
        required: true,
      },
      write: {
        type: Boolean,
        required: true,
      },
      edit: {
        type: Boolean,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Roles = mongoose.model("Roles", rolesSchema);

module.exports = Roles;
