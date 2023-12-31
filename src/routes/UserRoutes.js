const {
  registeredUser,
  loginUser,
  updateUser,
  allUser,
  oneUser,
  deleteUser,
  registeredBroker,
  loginBroker,
  updateBroker,
  allBroker,
  deleteBroker,
  oneBroker,
  userFovt,
  profilePic,
  profilePicBroker,
} = require("../controllers/UserController");
const { verifyUser, verifyBroker } = require("../middlewares/middlewares");
const { UserJoi, BorkerJoi } = require("../utils/Schemas");
const upload = require("../helper/multer");
const router = require("express").Router();

//users
router.post("/register", UserJoi, registeredUser);
router.post("/login", loginUser);
router.get("/saved", verifyUser, userFovt);
router.put("/update", verifyUser, updateUser);
router.put(
  "/profile/pic",
  upload.array("attachArtwork", 1),
  verifyUser,
  profilePic
);
router.get("/all", allUser);
router.get("/one/:Id", oneUser);
router.delete("/delete/:Id", deleteUser);

//broker
router.post("/registerBroker", BorkerJoi, registeredBroker);
router.post("/loginBroker", loginBroker);
router.put("/updateBroker", verifyBroker, updateBroker);
router.put(
  "/profile/pic/Borker",
  upload.array("attachArtwork", 1),
  verifyBroker,
  profilePicBroker
);
router.get("/allBroker", allBroker);
router.get("/oneBroker/:Id", oneBroker);
router.delete("/deleteBroker/:Id", deleteBroker);

module.exports = router;
