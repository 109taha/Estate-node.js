const JWT = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_ADMIN);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyBroker = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_BROKER);
    req.user = decryptedToken.BrokerId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_USER);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { verifyAdmin, verifyUser, verifyBroker };
