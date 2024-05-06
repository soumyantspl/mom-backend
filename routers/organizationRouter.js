const express = require("express");
const router = express.Router();
const {
  createOrganizationController,
  viewOrganizationController,
  editOrganizationController,
} = require("../controllers/organzationController");
const {
  createOrganisationValidator,
  editOrganizationValidator,
} = require("../validators/organizationValidator");

//CREATING NEW ORGANIZATION
router.post(
  "/createOrganization",
  createOrganisationValidator,
  createOrganizationController
);
//VIEWING LIST OF ORGANIZATION
router.get("/viewOrganization", viewOrganizationController);
//EDDITING ORGANIZATION IF NEEDED
router.post(
  "/editOrganization",
  editOrganizationValidator,
  editOrganizationController
);
module.exports = router;
