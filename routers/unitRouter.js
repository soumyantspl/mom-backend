const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");
const unitValidator = require("../validators/unitValidator");

// CREATE UNIT
router.post(
  "/createUnit",
  unitValidator.createUnitValidator,
  unitController.createUnit
);
//EDIT UNIT
router.put(
  "/editUnit/:id",
  unitValidator.editUnitValidator,
  unitController.editUnit
);
//DELETE UNIT
router.delete(
  "/deleteUnit/:id",
  unitValidator.deleteUnitValidator,
  unitController.deleteUnit
);
module.exports = router;
