const express = require("express");
const router = express.Router();
const {
  createOrganizationController,
  viewOrganizationController,
  editOrganizationController,
} = require("../controllers/organsationController");
const {
  createOrganisationValidator,
  editOrganizationValidator,
} = require("../validators/organisationValidator");

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
