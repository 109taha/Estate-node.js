const {
  createAdd,
  CreateFeature,
  allFeature,
  createFloorPlan,
} = require("../controllers/AddController");
const { AddJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");

router.post("/create", upload.array("pics", 5), createAdd);
router.post(
  "/create/floor",
  upload.array("floorPlansPics", 1),
  createFloorPlan
);

router.post("/create/feature", CreateFeature);
router.get("/get/feature", allFeature);

module.exports = router;
