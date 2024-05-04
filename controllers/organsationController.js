const {
  createOrganisationService,
  viewOrganisationService,
  editOrganisationService,
} = require("../services/organisationService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

const createOrgansationController = async (req, res) => {
  try {
    const { name, details, email, address, phone } = req.body;
    const response = await createOrganisationService(
      name,
      details,
      email,
      address,
      phone
    );
    console.log(response);
    return Responses.successResponse(
      req,
      res,
      null,
      messages.organisationCreated,
      200
    );
  } catch (error) {
    console.log(error.message);
    return Responses.errorResponse(req, res, error);
  }
};

const viewOrganisationController = async (req, res) => {
  const { name, email, page = 1, limit = 10 } = req.body;
  let query = {};
  if (name && email) {
    query = { name, email };
  } else if (email) {
    query = { email };
  } else if (name) {
    query = { email };
  }

  try {
    const response = await viewOrganisationService(query, page, limit);
    console.log(response);
    return Responses.successResponse(req, res, null, response, 200);
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

const editOrganisationController = async (req, res) => {
  const { id } = req.params;
  console.log("id-->", id);
  const updateData = req.body;
  console.log("updateData-->>", updateData);
  try {
    const result = await editOrganisationService(id, updateData);
    if (!result.Success) {
      return res.status(404).json({ message: result.message });
    }
    res.json(result.Organisation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrgansationController,
  viewOrganisationController,
  editOrganisationController,
};
