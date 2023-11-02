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
} = require("../controllers/UserController");
const { verifyUser, verifyBroker } = require("../middlewares/middlewares");
const router = require("express").Router();

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.put("/update", verifyUser, updateUser);
router.get("/all", allUser);
router.get("/one/:Id", oneUser);
router.delete("/delete/:Id", deleteUser);
router.post("/registerBroker", registeredBroker);
router.post("/loginBroker", loginBroker);
router.put("/updateBroker", verifyBroker, updateBroker);
router.get("/allBroker", allBroker);
router.get("/oneBroker/:Id", oneBroker);
router.delete("/deleteBroker/:Id", deleteBroker);

module.exports = router;
