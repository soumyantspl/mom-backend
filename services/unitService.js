const Units = require("../models/unitModel");

const createUnit = async (data) => {
  const unitDetails = await checkDuplicate(data.organizationId, data.name);
  if (!unitDetails) {
    const newData = {
      name: data.name,
      address: data.address,
      organizationId: data.organizationId,
    };
    console.log("newData", newData);
    const unitData = new Units(newData);
    const newUnit = await unitData.save();
    console.log("UnitData", newUnit);

    return newUnit;
  }
  return false;
};

const editUnit = async (data, id) => {
  const unit = await Units.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return unit;
};

const deleteUnit = async (id) => {
  console.log("id--->>", id);
  const deletedUnit = await Units.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
  return deletedUnit;
};

const listUnit = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        organizationId,
        name: {$regex: searchKey, $options: 'i'},
        isActive: true,
      }
    : {
        organizationId,
        isActive: true,
      };

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);

  const totalCount = await Units.countDocuments(query);
  const unitData = await Units.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return { totalCount, unitData };
};
const checkDuplicate = async (organizationId, name) => {
  return await Units.findOne(
    { organizationId, name, isActive: true },
    { organizationId: 1, name: 1 }
  );
};

module.exports = {
  createUnit,
  editUnit,
  deleteUnit,
  listUnit
};
