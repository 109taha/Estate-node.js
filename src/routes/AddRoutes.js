const {
  createAdd,
  CreateFeature,
  allFeature,
  createFloorPlan,
  getFloorPlan,
  getAdd,
  deleteAdd,
  getOne,
  updateAdd,
  updateFloorPlan,
  acceptUserAdds,
} = require("../controllers/AddController");
const { AddJoi, floorPlansJoi } = require("../utils/Schemas");
const router = require("express").Router();
const upload = require("../helper/multer");
const { verifyBroker } = require("../middlewares/middlewares");

// adds
router.post("/create", upload.array("pics", 10), AddJoi, createAdd);
router.put("/liveAdd/:Id", verifyBroker, acceptUserAdds);
router.put("/update/:id", upload.array("pics", 10), updateAdd);
router.get("/all", getAdd);
router.get("/one/:Id", getOne);
router.delete("/delete/:Id", deleteAdd);

// floorPlan
router.post(
  "/create/floor",
  upload.array("floorPlansPics", 1),
  floorPlansJoi,
  createFloorPlan
);
router.put(
  "/update/floor/:id",
  upload.array("floorPlansPics", 1),
  floorPlansJoi,
  updateFloorPlan
);
router.get("/get/floor", getFloorPlan);

//feature
router.post("/create/feature", CreateFeature);
router.get("/get/feature", allFeature);

module.exports = router;
