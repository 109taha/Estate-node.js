const joi = require("joi");

const userSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(7).max(70).required(),
});

const UserJoi = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const BrokerSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(7).max(70).required(),
});

const BorkerJoi = (req, res, next) => {
  const { error } = BrokerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const AddSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[a-f\d]{24}$/i)
    .required(),
  description: joi
    .string()
    .pattern(/^[a-f\d]{500}$/i)
    .required(),
  price: joi.number().required().min(1940).max(9999999999999999999999999999),
  address: joi.string(),
  city: joi.string(),
  country: joi.string(),
  rooms: joi.number().required().min(1).max(50),
  washRooms: joi.number().required().min(1).max(50),
  createdByUser: joi.string(),
  createdByAgent: joi.string(),
  location: joi.string(),
});

const AddJoi = (req, res, next) => {
  const { error } = AddSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

module.exports = { AddJoi, UserJoi, BorkerJoi };
