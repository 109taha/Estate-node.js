const Add = require("../models/AddModel");

const createAdd = async (req, res) => {
  try {
    const newAddData = req.body;
    const newAdd = await Add({
      ...newAddData,
    });
    console.log(newAdd);
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error`" });
    throw error;
  }
};

module.exports = { createAdd };
