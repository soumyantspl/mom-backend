const authService = require("../services/authService");

// Send Otp

const sendOtp = async (req, res) => {
  try {
    const userFound = await authService.verifyEmail(req.body.email);
    console.log("userFound----------", userFound);
    if (!userFound) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Otp sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = {
  sendOtp,
};
