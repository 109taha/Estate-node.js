const {
  registeredUser,
  loginUser,
  updateUser,
  allUser,
  oneUser,
  deleteUser,
} = require("../controllers/UserController");
const { verifyUser } = require("../middlewares/middlewares");
const router = require("express").Router();

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.put("/update", verifyUser, updateUser);
router.get("/all", allUser);
router.get("/one/:Id", oneUser);
router.delete("/delete/:Id", deleteUser);

module.exports = router;
