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

module.exports = {
  sendOtp,
};
