const express = require("express");
const router = express.Router();
const organzationController = require("../controllers/organizationController");
const organizationValidator = require("../validators/organizationValidator");
const authMiddleware = require("../middlewares/authMiddleware");
//CREATING NEW ORGANIZATION
router.post(
  "/createOrganization",
  organizationValidator.createOrganisationValidator,
  organzationController.createOrganizationController
);
//VIEWING LIST OF ORGANIZATION
router.get(
  "/viewOrganization",
  authMiddleware.verifyUserToken,
  organizationValidator.viewOrganizationValidator,
  organzationController.viewOrganizationController
);
//EDDITING ORGANIZATION
router.post(
  "/editOrganization",
  authMiddleware.verifyUserToken,
  organizationValidator.editOrganizationValidator,
  organzationController.editOrganizationController
);
module.exports = router;
