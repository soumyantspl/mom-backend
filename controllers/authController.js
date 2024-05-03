const { signInService } = require("../services/authServices");

// Send Otp
const sendOtp = async (req, res) => {
  try {
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
//SignIn Controller
const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signInService(email, password);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    return res.json(result.message);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};
module.exports = {
  sendOtp,
  signInController,
};
