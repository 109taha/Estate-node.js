const AddReview = require("../models/AddReviewModel");

const create = async (req, res) => {
  try {
    const addId = req.params.Id;
    const userId = req.user;
    const review = req.body.review;
    if (!review) {
      return res
        .status(400)
        .send({ success: false, message: "You have to add review first" });
    }
    const newReview = new AddReview({
      addId,
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

const update = async (req, res) => {
  try {
    console.log(123);
    const reviewId = req.params.reviewId;
    const review = req.body.review;
    if (!review) {
      return res
        .status(400)
        .send({ success: false, message: "You have to add review first" });
    }

    const oldreview = await AddReview.findById(reviewId);

    oldreview.review = review;

    await oldreview.save();

    res.status(200).send({
      message: true,
      message: "Review added suvcessfully",
      data: oldreview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const read = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const total = await AddReview.countDocuments();

    const allAdds = await AddReview.find()
      .populate({ path: "addId", select: "name address price" })
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    const totalPages = Math.ceil(total / limit);

    if (allAdds.length <= 0) {
      return res.status(400).send({ success: false, message: "No Adds found" });
    }
    res.status(200).send({
      success: true,
      message: "Following are all the Adds",
      data: allAdds,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const onlyAddReview = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }
    const addId = req.params.Id;

    const total = await AddReview.countDocuments({ addId: addId });

    const allAdds = await AddReview.find({ addId: addId })
      .populate({ path: "addId", select: "name address price" })
      .skip(skip)
      .limit(limit)
      .sort(sortBY);

    const totalPages = Math.ceil(total / limit);

    if (allAdds.length <= 0) {
      return res.status(400).send({ success: false, message: "No Adds found" });
    }
    res.status(200).send({
      success: true,
      message: "Following are all the Adds",
      data: allAdds,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const readOne = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }
    const review = req.params.Id;

    const total = await AddReview.countDocuments(review);

    const allAdds = await AddReview.findById(review)
      .populate({
        path: "userId",
        select: "first_name last_name",
      })
      .populate({
        path: "addId",
        select: "name address price",
      });

    const totalPages = Math.ceil(total / limit);

    if (allAdds.length <= 0) {
      return res.status(400).send({ success: false, message: "No Adds found" });
    }
    res.status(200).send({
      success: true,
      message: "Following are all the Adds",
      data: allAdds,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

const deleted = async (req, res) => {
  try {
    const review = req.params.Id;
    const deleteReview = await AddReview.findByIdAndDelete(review);
    if (!deleteReview) {
      return res
        .status(400)
        .send({ success: false, message: "No review found on that id" });
    }
    res
      .status(200)
      .send({ success: true, message: "Review Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, message: "Internal server error" });
    throw error;
  }
};

module.exports = { create, update, read, onlyAddReview, readOne, deleted };
