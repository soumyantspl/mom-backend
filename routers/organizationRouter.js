const express = require("express");
const router = express.Router();
const organzationController = require("../controllers/organizationController");
const organizationValidator = require("../validators/organizationValidator");
const authMiddleware = require("../middlewares/authMiddleware");
//CREATING NEW ORGANIZATION
router.post(
  "/createOrganization",
  // organizationValidator.createOrganisationValidator,
  organzationController.createOrganizationController
);
//VIEWING LIST OF ORGANIZATION
router.get(
  "/viewOrganization",
  organizationValidator.viewOrganizationValidator,
  authMiddleware.verifyUserToken,
  organzationController.viewOrganizationController
);
//EDDITING ORGANIZATION
router.post(
  "/editOrganization/:id",
  // organizationValidator.editOrganizationValidator,
  // authMiddleware.verifyUserToken,
  organzationController.editOrganizationController
);
module.exports = router;
