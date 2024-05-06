/*FUNC- TO SEND THE SUCCESS RESPONSE*/
const successResponse = (req, res, data, message, statusCode) => {
  console.log("message---------", message);
  return res.status(statusCode).send({
    error: false,
    success: true,
    message: message,
    data: {
      successResult: data,
    }
  });
};

/*FUNC- TO SEND THE FAIL RESPONSE*/
const failResponse = (req, res, data, message, statusCode) => {
  return res.status(statusCode).send({
    error: false,
    success: false,
    message: message,
    data: {
      errorResult: data,
    }
  });
};

/*FUNC- TO ERROR THE FAIL RESPONSE*/
//  const errorResponse = (req, res, errorDesc, errorKey) => {
//     console.log('>>>>>>>>>>>>>   ERROR\n', errorKey);
//     const statusCode=errorKey? errorKey : 500;
//     return res.status(statusCode).send({
//       error: true,
//       errorKey,
//       errorDesc: errorDesc,
//       errorMessage: errorDesc.message,
//       errorStack: errorDesc.stack,
//       statusCode
//     });
//   };

/*FUNC- TO ERROR THE FAIL RESPONSE*/
const errorResponse = (req, res, errorDesc, errorKey) => {
  console.log(">>>>>>>>>>>>>   ERROR\n", errorKey);
  const statusCode = errorKey ? errorKey : 500;
  return res.status(statusCode).send({
    error: true,
    success: false,
    message: errorDesc.message,
    data: {
      errorResult: null,
    },
  });
};
module.exports = {
  errorResponse,
  failResponse,
  successResponse,
};
