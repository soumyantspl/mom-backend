const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const validator = require("../validators/roleValidator");

/* CREATE ROLE */
router.post(
  "/createRole",
  validator.createRoleValidator,
  roleController.createRole
);

/* EDIT ROLE  */
router.put(
  "/updateRole/:id",
  validator.updateRoleValidator,
  roleController.editRole
);

/* VIEW ROLE  */
router.get("/viewRole", validator.viewRoleValidator, roleController.viewRole);

/* DELETE ROLE  */
router.delete(
  "/deleteRole/:id",
  validator.deleteRoleValidator,
  roleController.deleteRole
);
module.exports = router;
