// View Meeting

const view = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      msg: "Meeting Data Fetched Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      msg: error.message,
    });
  }
};

module.exports = {
  view,
};
