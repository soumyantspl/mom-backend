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

const checkDuplicate = async (organizationId, name) => {
  return await Units.findOne(
    { organizationId, name },
    { organizationId: 1, name: 1 }
  );
};

module.exports = {
  createUnit,
  editUnit,
};
