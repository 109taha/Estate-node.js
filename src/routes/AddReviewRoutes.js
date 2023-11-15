const { create } = require("../controllers/AddReviewController");
const { AddJoi, floorPlansJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");
const { verifyBroker, verifyUser } = require("../middlewares/middlewares");

// adds
router.post("/create", verifyUser, create);

module.exports = router;
