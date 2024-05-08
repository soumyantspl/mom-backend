const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");
const unitValidator = require("../validators/unitValidator");

router.post(
  "/createUnit",
  unitValidator.createUnitValidator,
  unitController.createUnitController
);
module.exports = router;
