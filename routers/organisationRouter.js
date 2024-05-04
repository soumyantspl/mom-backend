const express = require("express");
const router = express.Router();
const {
  createOrgansationController,
  viewOrganisationController,
  editOrganisationController,
} = require("../controllers/organsationController");
const {
  organisationValidator,
} = require("../validators/organisationValidator");

router.post(
  "/createOrganisation",
  organisationValidator,
  createOrgansationController
);
router.get("/viewOrganisation", viewOrganisationController);
router.post("/editOrganisation/:id", editOrganisationController);
module.exports = router;
