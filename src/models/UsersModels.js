const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
    },
    profile_pic: {
      type: String,
    },
    fovt: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adds",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
