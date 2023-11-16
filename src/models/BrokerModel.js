const mongoose = require("mongoose");

const BrokerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    profile_pic: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Broker = mongoose.model("Broker", BrokerSchema);

module.exports = Broker;
