const express = require("express");
const router = express.Router();
const {
  createOrgansationController,
} = require("../controllers/organsationController");
const {
  organisationValidator,
} = require("../validators/organisationValidator");

router.post(
  "/createOrganisation",
  organisationValidator,
  createOrgansationController
);
module.exports = router;
