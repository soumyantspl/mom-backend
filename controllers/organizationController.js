const organizationService = require("../services/organizationService");
const Responses = require("../helpers/response");
const messages = require("../constants/constantMessages");
const { errorLog } = require("../middlewares/errorLog");

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
    errorLog(error);
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
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

const editOrganizationController = async (req, res) => {
  try {
    //Checking given ID is availabled or Not
    const result = await organizationService.editOrganizationService(
     "663dbc52c6d385847217c4b0",
      req.params.id,
      req.body,
      req.ip
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
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createOrganizationController,
  viewOrganizationController,
  editOrganizationController,
};
