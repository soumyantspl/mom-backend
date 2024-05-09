const Designations = require("../models/designationModel");

const createDesignationService = async (name, organizationId) => {
  const newDesignation = new Designations({
    name,
    organizationId,
  });
  return await newDesignation.save();
};

const editDesignationService = async (id, name) => {
  const existingDepartment = await Designations.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return existingDepartment;
};

const deleteDesignationService = async (id) => {
  const deletedDepartment = await Designations.findByIdAndDelete(id);
  return deletedDepartment;
};
const listDesignationService = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? { organizationId, name: searchKey, isActive: true }
    : {
        organizationId,
        isActive: true,
      };

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);
  const totalCount = await Designations.countDocuments(query);
  const designationList = await Designations.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return {
    totalCount,
    designationList,
  };
};
module.exports = {
  createDesignationService,
  editDesignationService,
  deleteDesignationService,
  listDesignationService,
};
