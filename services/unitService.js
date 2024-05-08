const Unit = require("../models/unitModel");

const createUnit = async (data) => {
  console.log("->>", data);
  const unitDetails = await checkDuplicate(data.name, data.address, data.id);
  console.log("unitDetails=>", unitDetails);
  if (!unitDetails) {
    const newData = {
      name: data.title,
      address: data.address,
      _id: data.id,
    };
    console.log("newData", newData);
    const unitData = new Unit(newData);
    const newUnit = await unitData.save();
    console.log("UnitData", newUnit);

    return newUnit;
  }
  return false;
};

const checkDuplicate = async (id) => {
  console.log(id);
  return await Unit.findOne({ id, isActive: true });
};

module.exports = {
  createUnit,
};
