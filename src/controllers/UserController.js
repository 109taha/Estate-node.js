const User = require("../models/UsersModels");
const Broker = require("../models/BrokerModel");
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
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }
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

const registeredBroker = async (req, res) => {
  try {
    const broker = req.body;
    const existingBroker = await Broker.findOne({ email: broker.email });
    if (existingBroker) {
      return res
        .status(400)
        .send({ success: false, message: "Broker Already Registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(broker.password, salt);
    broker.password = hashedPassword;

    const newBroker = await Broker({
      first_name: broker.first_name,
      last_name: broker.last_name,
      email: broker.email,
      hash_password: broker.password,
    });
    await newBroker.save();

    const token = JWT.sign(
      { BrokerId: newBroker._id },
      process.env.JWT_SEC_BROKER
    );

    res.status(200).send({
      success: true,
      message: "Broker Registered Sucessfully",
      Token: token,
      Data: newBroker,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error!" });
    throw error;
  }
};

const loginBroker = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({
        success: false,
        message: "You have to provide the password and email",
      });
    }
    const broker = await Broker.findOne({ email });
    if (!broker) {
      return res
        .status(400)
        .send({ success: false, message: "No user found on that email" });
    }

    const validPassword = await bcrypt.compare(password, broker.hash_password);
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Maybe your Email or Password is not correct!",
      });
    }

    const token = JWT.sign(
      { BrokerId: broker._id },
      process.env.JWT_SEC_BROKER
    );

    return res.status(200).send({
      success: true,
      message: "Broker login successfully",
      Token: token,
      Data: broker,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateBroker = async (req, res) => {
  try {
    const brokerId = req.user;
    const { first_name, last_name, email, password, phone } = req.body;
    const broker = await Broker.findById(brokerId);
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(broker.password, salt);
      broker.password = hashedPassword;
      broker.hash_password = hashedPassword || broker.hash_password;
    }

    broker.first_name = first_name || broker.first_name;
    broker.last_name = last_name || broker.last_name;
    broker.email = email || broker.email;
    broker.phone = phone || broker.phone;

    const token = JWT.sign(
      { BrokerId: broker._id },
      process.env.JWT_SEC_BROKER
    );

    return res.status(200).send({
      success: true,
      message: "Broker Update successfully",
      Token: token,
      Data: broker,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const allBroker = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await Broker.countDocuments();

    let sortBY = { createdAt: -1 };
    if (req.query.sort) {
      sortBY = JSON.parse(req.query.sort);
    }

    const brokers = await Broker.find().skip(skip).limit(limit).sort(sortBY);
    if (brokers.lenght <= 0) {
      return res
        .status(400)
        .send({ success: false, message: "No Brokers Found" });
    }

    const totalPages = Math.ceil(total / limit);

    res.status(200).send({
      success: true,
      message: "Following are the all Brokers",
      Data: brokers,
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

const oneBroker = async (req, res) => {
  try {
    const brokerId = req.params.Id;
    const brokers = await Broker.findById(brokerId);
    if (!brokers) {
      return res
        .status(400)
        .send({ success: false, message: "No Brokers Found" });
    }

    res.status(200).send({
      success: true,
      message: "Following are the Brokers",
      Data: brokers,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const deleteBroker = async (req, res) => {
  try {
    const brokerId = req.params.Id;
    const broker = await Broker.findByIdAndDelete(brokerId);

    res
      .status(200)
      .send({ success: true, message: "Broker deleted successfully" });
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
  registeredBroker,
  loginBroker,
  updateBroker,
  allBroker,
  deleteBroker,
  oneBroker,
};
