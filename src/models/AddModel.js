const mongoose = require("mongoose");

const AddSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    propertyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Details",
      require: true,
    },
    feature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Features",
      require: true,
    },
    floorPlans: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FloorPlans",
      require: true,
    },

    address: {
      type: String,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      maxlength: 50,
    },
    country: {
      type: String,
      required: true,
      maxlength: 50,
    },
    rooms: {
      type: Number,
      required: true,
      min: 1,
    },
    washRooms: {
      type: Number,
      required: true,
      min: 1,
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdByAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Add = mongoose.model("Adds", AddSchema);

module.exports = Add;
