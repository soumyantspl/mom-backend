const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const validator = require("../validators/roleValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE ROLE */
router.post(
  "/createRole",
  authMiddleware.verifyUserToken,
  validator.createRoleValidator,
  roleController.createRole
);

/* EDIT ROLE  */
router.put(
  "/updateRole/:id",
  authMiddleware.verifyUserToken,
  validator.updateRoleValidator,
  roleController.editRole
);

/* VIEW ROLE  */
router.get(
  "/viewRole",
  authMiddleware.verifyUserToken,
  validator.viewRoleValidator,
  roleController.viewRole
);

/* DELETE ROLE  */
router.delete(
  "/deleteRole/:id",
  authMiddleware.verifyUserToken,
  validator.deleteRoleValidator,
  roleController.deleteRole
);
module.exports = router;
