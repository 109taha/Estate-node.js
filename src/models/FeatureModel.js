const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  feature: {
    type: String,
    required: true,
  },
});

const Feature = mongoose.model("Feature", FeatureSchema);

module.exports = Feature;
