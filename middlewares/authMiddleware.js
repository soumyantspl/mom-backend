const jwt = require("jsonwebtoken");

/*FUNC TO GENERATE NEW TOKEN FOR USER*/
const generatUserToken = (data) => {
  token = jwt.sign(data, process.env.JWT_USER_SECRET, {
    //expiresIn: 86400 // 24 hours
    expiresIn: "365d", // 365 days
  });
  return `Bearer ${token}`;
};


/*FUNC TO VERIFY A TOKEN FOR USER*/
const verifyUserToken = (req, res, next) => {

   try{
      let token = req.headers.authorization;
  
    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length);
    }
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    req.userId = decoded._id;
    next();
  }
  catch(error){
    return Responses.failResponse(req, res, null, messages.invaliToken, 401);
  }
}

module.exports = {
  generatUserToken,verifyUserToken
};
