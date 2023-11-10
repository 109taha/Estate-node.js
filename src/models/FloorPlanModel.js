const mongoose = require("mongoose");

const floorPlansSchema = new mongoose.Schema({
  floorPlansPics: {
    type: String,
    require: true,
  },
  totalSize: {
    type: Number,
  },
  roomSize: {
    type: Number,
  },
  washroomSize: {
    type: Number,
  },
  prices: {
    type: Number,
  },
});

const FloorPlans = mongoose.model("FloorPlans", floorPlansSchema);

module.exports = FloorPlans;
