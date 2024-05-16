const Role = require("../models/rolesModel");

/**FUNC- CREATE ROLE */
const createRole = async (data) => {
  console.log("----------------------33333", data);
  const roleDetails = await checkDuplicateEntry(data.name, data.organizationId);
  console.log("roleDetails--------------", roleDetails);
  if (!roleDetails) {
    const inputData = {
      name: data.name,
      organizationId: data.organizationId,
      permission: data.permission,
    };
    const roleData = new Role(inputData);
    const newRole = await roleData.save();
    console.log("newRole----------------", newRole);

    return newRole;
  }

  return false;
};

/**FUNC- TO VERIFY DUPLICATE ROOM */
const checkDuplicateEntry = async (name, organizationId) => {
  return await Role.findOne(
    { name, organizationId, isActive: true },
    { _id: 1, name: 1, organizationId: 1 }
  );
};

/**FUNC- UPDATE ROLE */
const updateRole = async (data, id) => {
  console.log("----------------------3333344", data);
  console.log("----------------------33333", id);
  let roleDetails;
  if(data.name){
    roleDetails = await checkDuplicateEntry(data.name, data.organizationId);
    console.log("roleDetails--------------", roleDetails);
  }
 
  if (!roleDetails) {
  const role = await Role.findByIdAndUpdate({ _id: id }, data, { new: true });
  console.log("role-----------------------", role);
  return role;
  }
 
  return  {
    isDuplicateName:true
  }
};

module.exports = {
  createRole,updateRole
};
