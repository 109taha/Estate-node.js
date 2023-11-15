const {
  create,
  update,
  read,
  deleted,
  onlyAddReview,
  readOne,
} = require("../controllers/AddReviewController");
const { AddJoi, floorPlansJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");
const { verifyBroker, verifyUser } = require("../middlewares/middlewares");

// review
router.post("/create/:Id", verifyUser, create);
router.post("/update/:reviewId", update);
router.get("/readAll", read);
router.get("/onlyAddReview/:Id", onlyAddReview);
router.get("/readOne/:Id", readOne);
router.delete("/delete/:Id", deleted);

module.exports = router;
