const User = require("../models/UsersModels");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registeredUser = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Already Registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      hash_password: user.password,
    });
    await newUser.save();

    const token = JWT.sign({ userId: newUser._id }, process.env.JWT_SEC_USER);

    res.status(200).send({
      success: true,
      message: "User Registered Sucessfully",
      Token: token,
      Data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({
        success: false,
        message: "You have to provide the password and email",
      });
    }
    const user = await User.findOne({ email });
    console.log(user);
    console.log(password);
    const validPassword = await bcrypt.compare(password, user.hash_password);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    return res.status(200).send({
      success: true,
      message: "User login successfully",
      Token: token,
      Data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user;
    const { first_name, last_name, email, password, phone } = req.body;
    const user = await User.findById(userId);

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      user.hash_password = hashedPassword || user.hash_password;
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SEC_USER);

    return res.status(200).send({
      success: true,
      message: "User Update successfully",
      Token: token,
      Data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const allUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const users = await User.find().skip(skip).limit(limit).sort(sortBY);
    if (users.lenght <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "No users Found" });
    }

    const totalPages = Math.ceil(total / limit);

    res.status(200).send({
      success: true,
      message: "Following are the all Users",
      Data: users,
      page,
      totalPages,
      limit,
      total,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const oneUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const users = await User.findById(userId);
    if (!users) {
      return res
        .status(400)
        .send({ success: false, message: "No users Found" });
    }

    res.status(200).send({
      success: true,
      message: "Following are the Users",
      Data: users,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.Id;
    const user = await User.findByIdAndDelete(userId);

    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registeredUser,
  loginUser,
  updateUser,
  allUser,
  deleteUser,
  oneUser,
};
