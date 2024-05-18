const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");
const unitValidator = require("../validators/unitValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// CREATE UNIT
router.post(
  "/createUnit",
  authMiddleware.verifyUserToken,
  unitValidator.createUnitValidator,
  unitController.createUnit
);
//EDIT UNIT
router.put(
  "/editUnit/:id",
  authMiddleware.verifyUserToken,
  unitValidator.editUnitValidator,
  unitController.editUnit
);
//DELETE UNIT
router.delete(
  "/deleteUnit/:id",
  authMiddleware.verifyUserToken,
  unitValidator.deleteUnitValidator,
  unitController.deleteUnit
);
//LIST UNIT API
router.get(
  "/listUnit",
  authMiddleware.verifyUserToken,
  unitValidator.listUnitValidator,
  unitController.listUnit
);
module.exports = router;
