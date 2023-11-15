const mongoose = require("mongoose");

const AddReviewModel = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adds",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    review: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const AddReview = mongoose.model("AddReview", AddReviewModel);

module.exports = AddReview;
