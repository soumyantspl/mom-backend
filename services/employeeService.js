const Employee = require("../models/employeeModel");

const createEmployeeForMeeting = async (data) => {
  const newEmployee = new Employee({ name, email, password });
  return await newEmployee.save();
};

/**FUNC- CREATE EMPLOYEE */
const createEmployee = async (data) => {
  console.log("----------------------33333", data);
  const [emailDetails, empCodeDetails] = await checkDuplicateEntry(
    data.email,
    data.organizationId,
    data.empId
  );

  console.log("emailDetails", emailDetails);
  console.log("empCodeDetails", empCodeDetails);
  if (emailDetails) {
    return {
      isDuplicateEmail: true,
    };
  }

  if (empCodeDetails) {
    return {
      isDuplicateEmpCode: true,
    };
  }

  if (!emailDetails && !empCodeDetails) {
    const inputData = {
      name: data.name,
      organizationId: data.organizationId,
      email: data.email,
      designationId: data.designationId,
      departmentId: data.departmentId,
      unitId: data.unitId,
      isMeetingOrganiser: data.isMeetingOrganiser,
      empId: data.empId,
    };
    const empData = new Employee(inputData);
    const newEmp = await empData.save();
    console.log("newEmp----------------", newEmp);

    return {
      data: newEmp,
    };
  }

  return false;
};
/**FUNC- TO DELETE AN EMPLOYEE */
const deleteEmploye = async (id) => {
  console.log("id--->>", id);
  const deletedEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );
  return deletedEmployee;
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE */
const checkDuplicateEntry = async (email, organizationId, empId) => {
  console.log("email---------------", email);
  console.log("empId---------------", empId);
  console.log("organizationId---------------", organizationId);
  return await Promise.all([
    checkDuplicateEmail(email, organizationId),
    checkDuplicateEmpId(empId, organizationId),
  ]);
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE EMAIL */
const checkDuplicateEmail = async (email, organizationId) => {
  console.log("email---------------", email);
  console.log("organizationId---------------", organizationId);

  return await Employee.findOne(
    { email, organizationId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE ID */
const checkDuplicateEmpId = async (empId, organizationId) => {
  console.log("empid---------------", empId);
  console.log("organizationId---------------", organizationId);
  return await Employee.findOne(
    { empId, organizationId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};
/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  let query = searchKey
    ? {
        $and: [
          {
            $or: [{ name: {$regex: searchKey, $options: 'i'} }, { empId: {$regex: searchKey, $options: 'i'} }],
          },
          {
            organizationId,
            isActive: true,
          },
        ],
      }
    : {
        organizationId,
        isActive: true,
      };

  var limit = parseInt(queryData.limit);
  var skip = (parseInt(queryData.page) - 1) * parseInt(limit);

  const totalCount = await Employee.countDocuments(query);
  const employeeData = await Employee.find(query)
    .sort({ createdAt: parseInt(order) })
    .limit(limit)
    .skip(skip);

  return { totalCount, employeeData };
};

/**FUNC- TO SEE SINGLE EMPLOYE DETAILS */
const viewSingleEmployee = async (id) => {
  const singleEmployeDetails = await Employee.findById({
    _id: id,
    isActive: true,
  });
  console.log("single employee", singleEmployeDetails);
  return singleEmployeDetails;
};

/**FUNC- TO VERIFY ACTIVE USER*/
const verifyEmployee = async (empId) => {
  console.log("empId-----------", empId);
  return await Employee.findOne(
    { _id: empId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};

/**FUNC- EDIT EMPLOYEE */
const editEmployee = async (data, id) => {
  console.log("----------------------3333344", data);
  console.log("----------------------33333", id);

  console.log("----------------------33333", data);
  const [emailDetails, empCodeDetails] = await checkDuplicateEntry(
    data.email,
    data.organizationId,
    data.empId
  );

  console.log("emailDetails", emailDetails);
  console.log("empCodeDetails", empCodeDetails);
  if (emailDetails) {
    return {
      isDuplicateEmail: true,
    };
  }

  if (empCodeDetails) {
    return {
      isDuplicateEmpCode: true,
    };
  }

  const employee = await Employee.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  console.log("employee-----------------------", employee);
  return employee;
};

module.exports = {
  createEmployee,
  listEmployee,
  verifyEmployee,
  editEmployee,
  deleteEmploye,
  listEmployee,
  viewSingleEmployee,
};
