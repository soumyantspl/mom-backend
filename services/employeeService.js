const Employee = require("../models/employeeModel");

const createEmployee1 = async (data) => {
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
  );;

  console.log("emailDetails", emailDetails);
  console.log("empCodeDetails", empCodeDetails);
  if (emailDetails) {
    return {
      isDuplicateEmail: true
    }
  }

  if (empCodeDetails) {
    return {
      isDuplicateEmpCode: true
    }
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
      empId: data.empId
    };
    const empData = new Employee(inputData);
    const newEmp = await empData.save();
    console.log("newEmp----------------", newEmp);

    return {
      data: newEmp
    };
  }

  return false;
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE */
const checkDuplicateEntry = async (email, organizationId, empId) => {
  console.log("email---------------", email)
  console.log("empId---------------", empId)
  console.log("organizationId---------------", organizationId)
  return await Promise.all([checkDuplicateEmail(email, organizationId), checkDuplicateEmpId(empId, organizationId)])
};


/**FUNC- TO VERIFY DUPLICATE EMPLOYEE EMAIL */
const checkDuplicateEmail = async (email, organizationId) => {
  console.log("email---------------", email)
  console.log("organizationId---------------", organizationId)

  return await Employee.findOne(
    { email, organizationId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  )
};


/**FUNC- TO VERIFY DUPLICATE EMPLOYEE ID */
const checkDuplicateEmpId = async (empId, organizationId) => {
  console.log("empid---------------", empId)
  console.log("organizationId---------------", organizationId)
  return await Employee.findOne(
    { empId, organizationId, isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  )
};

const viewEmployeeService = async (empId) => {
  const newEmployee = new Employee({ name, email, password });
  return await newEmployee.save();
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
  );;

  console.log("emailDetails", emailDetails);
  console.log("empCodeDetails", empCodeDetails);
  if (emailDetails) {
    return {
      isDuplicateEmail: true
    }
  }

  if (empCodeDetails) {
    return {
      isDuplicateEmpCode: true
    }
  }


  const employee= await Employee.findByIdAndUpdate({ _id: id }, data, { new: true });
  console.log("employee-----------------------", employee);
  return employee;
};



module.exports = {
  createEmployee,
  viewEmployeeService,
  verifyEmployee,editEmployee
};
