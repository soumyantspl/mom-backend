const organizationService = require("../services/organizationService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");

const createOrganizationController = async (req, res) => {
  try {
    const { name, details, email, address, phone } = req.body;
    //checking given email is exist or not
    const duplicateResult = await organizationService.existingOrganization(
      email
    );
    console.log("duplicateResult-->", duplicateResult);
    if (duplicateResult) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.duplicateOrganizationFound,
        404
      );
    }
    const result = await organizationService.createOrganizationService(
      name,
      details,
      email,
      address,
      phone
    );
    return Responses.successResponse(
      req,
      res,
      result._id,
      messages.organizationCreated,
      200
    );
  } catch (error) {
    console.log(error.message);
    return Responses.errorResponse(req, res, error);
  }
};

const viewOrganizationController = async (req, res) => {
  const { name, email, limit, page } = req.body;
  let query = {};
  if (name && email) {
    query = { name, email };
  } else if (email) {
    query = { email };
  } else if (name) {
    query = { email };
  }
  try {
    const response = await organizationService.viewOrganizationService(
      query,
      page,
      limit
    );
    console.log(response);
    return Responses.successResponse(req, res, null, response, 200);
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error);
  }
};

const editOrganizationController = async (req, res) => {
  const id = req.query.id;
  const updateData = req.body;
  try {
    //Checking given ID is availabled or Not
    const result = await organizationService.editOrganizationService(
      id,
      updateData
    );
    if (!result) {
      return Responses.failResponse(
        req,
        res,
        null,
        messages.idIsNotAvailabled,
        404
      );
    }
    return Responses.successResponse(
      req,
      res,
      result._id,
      messages.organizationUpdated,
      200
    );
  } catch (error) {
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createOrganizationController,
  viewOrganizationController,
  editOrganizationController,
};
