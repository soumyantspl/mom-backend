const Employee = require("../models/employeeModel");
const ObjectId = require("mongoose").Types.ObjectId;
const Designations = require("../models/designationModel");
const logService = require("./logsService");
const logMessages = require("../constants/logsConstants");
const commonHelper = require("../helpers/commonHelper");
const Department = require("../models/departmentModel");
const Units = require("../models/unitModel");

// const createEmployeeForMeeting = async (data) => {
//   const newEmployee = new Employee({ name, email, password });
//   return await newEmployee.save();
// };

/**FUNC- CREATE EMPLOYEE */
const createEmployee = async (userId, data, ipAddress = "1000") => {
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
    const result = await empData.save();

    ////////////////////LOGER START
    console.log("result------------>", result);
    const logData = {
      moduleName: logMessages.Employee.moduleName,
      userId,
      action: logMessages.Employee.createEmployee,
      ipAddress,
      details: "N/A",
      organizationId: result.organizationId,
    };
    console.log("logData-------------------", logData);
    await logService.createLog(logData);
    ///////////////////// LOGER END
    return result;
  }

  return false;
};
/**FUNC- TO FETCH MASTER DATA*/
const masterData = async (organizationId) => {
  console.log("organizationId--->>", organizationId);
  let query = { organizationId: organizationId, isActive: true };
  const designationList = await Designations.find(query, { name: 1 });
  const departmentList = await Department.find(query, { name: 1 });
  const unitList = await Units.find(query, { name: 1 });
  const message = `${designationList.length} designation found , ${departmentList.length} department found &  ${unitList.length} unit found `;
  const masterData = { designationList, departmentList, unitList };
  return {
    message,
    masterData,
  };
};

/**FUNC- TO DELETE AN EMPLOYEE */
const deleteEmploye = async (userId, id, ipAddress = "1000") => {
  console.log("id--->>", id);
  const result = await Employee.findByIdAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  );

  ////////////////////LOGER START
  console.log("result------------>", result);

  const logData = {
    moduleName: logMessages.Employee.moduleName,
    userId,
    action: logMessages.Employee.deleteEmployee,
    ipAddress,
    details: "N/A",
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return result;
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

/**FUNC- TO VERIFY DUPLICATE USER */
const checkDuplicateUserEntry = async (data) => {
  console.log("email---------------",data.email);

  console.log("organizationId---------------", data.organizationId);
  return await checkDuplicateEmail(data.email, data.organizationId);
  
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE EMAIL */
const checkDuplicateEmail = async (email, organizationId) => {
  console.log("email---------------", email);
  console.log("organizationId---------------", organizationId);

  return await Employee.findOne(
    { email, organizationId: new ObjectId(organizationId), isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};

/**FUNC- TO VERIFY DUPLICATE EMPLOYEE ID */
const checkDuplicateEmpId = async (empId, organizationId) => {
  console.log("empid---------------", empId);
  console.log("organizationId---------------", organizationId);
  return await Employee.findOne(
    { empId, organizationId: new ObjectId(organizationId), isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};
/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
  const { order } = queryData;
  const { organizationId, searchKey } = bodyData;
  const fields={
    "designationId": 1,
    "departmentId": 1,
    "unitId": 1,
    "isEmployee": 1,
    "_id": 1,
    "email": 1,
    "isActive": 1,
    "organizationId": 1,
    "name":1,
    "isMeetingOrganiser": 1,
    "empId":1
  }
  let query = searchKey
    ? {
        $and: [
          {
            $or: [
              { name: { $regex: searchKey, $options: "i" } },
              { empId: { $regex: searchKey, $options: "i" } },
            ],
          },
          {
            organizationId: new ObjectId(organizationId),
            isActive: true,
          },
        ],
      }
    : {
        organizationId: new ObjectId(organizationId),
        isActive: true,
      };

  let mongooseQuery = null;
  if (queryData.limit && queryData.page && queryData.order) {
    const limit = parseInt(queryData.limit);
    const skip = (parseInt(queryData.page) - 1) * parseInt(limit);
    mongooseQuery = Employee.find(query,fields)
     // .sort({ createdAt: parseInt(order) })
      .sort({ _id: parseInt(order) })
      .skip(skip)
      .limit(limit)
      
  } else {
    mongooseQuery = Employee.find(query,fields);
  }
  const totalCount = await Employee.countDocuments(query);
  const employeeData = await mongooseQuery;

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
    { _id: new ObjectId(empId), isActive: true },
    { _id: 1, email: 1, organisationId: 1, name: 1, isActive: 1 }
  );
};

/**FUNC- EDIT EMPLOYEE */
const editEmployee = async (userId, id, data, ipAddress = "1000") => {
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

  const result = await Employee.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  console.log("employee-----------------------", result);
  ////////////////////LOGER START
  const inputKeys = Object.keys(data);
  const details = await commonHelper.generateLogObject(
    inputKeys,
    result,
    userId,
    data
  );
  const logData = {
    moduleName: logMessages.Employee.moduleName,
    userId,
    action: logMessages.Employee.editEmployee,
    ipAddress,
    details: details.join(" , "),
    organizationId: result.organizationId,
  };
  console.log("logData-------------------", logData);
  await logService.createLog(logData);

  ///////////////////// LOGER END
  return result;
};

/**FUNC- ADD VISITOR AS ATTENDEE IN EMPLOYEE */
const createAttendee = async (name, email, organizationId) => {
  console.log(organizationId);
  const emailDetails = await checkDuplicateEmail(email, organizationId);
  console.log("emailDetails-------------", emailDetails);
  if (!emailDetails) {
    const inputData = {
      name,
      email,
      organizationId: new ObjectId(organizationId),
      isEmployee: false,
    };
    const empData = new Employee(inputData);
    const newEmp = await empData.save();
    console.log("newEmp----------------", newEmp);
    return newEmp;
  }
  return {
    isDuplicate: true,
  };
};

/**FUNC- ADD VISITORS AS ATTENDEE IN EMPLOYEE */
const createAttendees = async (attendees ) => {

  
  console.log("attendees-------------", attendees);
  // if (!emailDetails) {
  //   const inputData = {
  //     name,
  //     email,
  //     organizationId: new ObjectId(organizationId),
  //     isEmployee: false,
  //   };
   // const empData = new Employee(attendees);
    const newEmps = await Employee.insertMany(attendees);

  //   Student.insertMany([
  //     { name: "Student1", school: "ABC", class: "A1" },
  //     { name: "Student2", school: "ABC", class: "A2" },
  // ])


    console.log("newEmp----------------", newEmps);
    return newEmps;

};

module.exports = {
  createEmployee,
  listEmployee,
  verifyEmployee,
  editEmployee,
  deleteEmploye,
  listEmployee,
  viewSingleEmployee,
  createAttendee,
  masterData,
  checkDuplicateUserEntry,
  createAttendees
};
