const AddReview = require("../models/AddReviewModel");

const create = async (req, res) => {
  try {
    const blogId = req.params.Id;
    const userId = req.user;
    const review = req.body.review;
    if (!review) {
      return res
        .status(400)
        .send({ success: false, message: "You have to add review first" });
    }
    const newReview = new AddReview({
      blogId,
      userId,
      review,
    });

    await newReview.save();

    res.status(200).send({
      message: true,
      message: "Review added suvcessfully",
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

module.exports = { create };
