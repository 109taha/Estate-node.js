const {
  createAdd,
  CreateFeature,
  allFeature,
} = require("../controllers/AddController");
const { AddJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");

router.post(
  "/create",
  upload.fields([
    { name: "pics", maxCount: 23 },
    { name: "floorPlans", maxCount: 9 },
  ]),
  createAdd
);

router.post("/create/feature", CreateFeature);
router.get("/get/feature", allFeature);

module.exports = router;
