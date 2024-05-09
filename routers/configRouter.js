const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const validator = require("../validators/configValidator");

/* CREATE CONFIGURATION  */
router.post("/createConfiguration", validator.createConfigValidator, configController.createConfig);

/* EDIT CONFIGURATION  */
router.put("/editConfiguration/:id", validator.updateConfigValidator, configController.editConfig);

/* VIEW CONFIGURATION  */
router.get("/viewConfiguration/:organizationId", validator.viewConfigValidator, configController.viewConfig);

/* DELETE CONFIGURATION  */
router.delete("/deleteConfiguration/:id", validator.deleteConfigValidator, configController.deleteConfig);



module.exports = router;