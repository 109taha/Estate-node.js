const {
  createAdd,
  CreateFeature,
  allFeature,
  createFloorPlan,
  getFloorPlan,
  getAdd,
  deleteAdd,
} = require("../controllers/AddController");
const { AddJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");

// adds
router.post("/create", upload.array("pics", 10), createAdd);
router.get("/all", getAdd);
router.delete("/delete/:Id", deleteAdd);

// floorPlan
router.post(
  "/create/floor",
  upload.array("floorPlansPics", 1),
  createFloorPlan
);
router.get("/get/floor", getFloorPlan);

//feature
router.post("/create/feature", CreateFeature);
router.get("/get/feature", allFeature);

module.exports = router;
