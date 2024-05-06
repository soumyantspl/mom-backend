const viewEmployee = async (req, res) => {
  try {
    console.log(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = { viewEmployee };
