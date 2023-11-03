const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  feature: {
    type: String,
    require: true,
  },
});

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
