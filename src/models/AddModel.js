const mongoose = require("mongoose");

const AddSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
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
    pics: [
      {
        type: String,
        require: true,
      },
    ],
    location: {
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
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    propertyDetail: {
      size: {
        type: String,
        require: true,
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
      garage: {
        type: Boolean,
        require: true,
      },
      garageSize: {
        type: String,
        require: true,
      },

      propertyType: {
        type: String,
        require: true,
      },
      yearBuilt: {
        type: String,
        require: true,
      },
    },
    floorPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FloorPlans",
      },
    ],
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdByAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
    },
    feature: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feature",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Add = mongoose.model("Adds", AddSchema);

module.exports = Add;
