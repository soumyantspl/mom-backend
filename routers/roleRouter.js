const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const validator = require("../validators/roleValidator");

/* CREATE ROLE */
router.post("/createRole", validator.createRoleValidator, roleController.createRole);

/* EDIT ROLE  */
router.put("/updateRole/:id", validator.updateRoleValidator, roleController.editRole);

module.exports = router;
