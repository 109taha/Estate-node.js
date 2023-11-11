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

const AddSchema = joi
  .object({
    name: joi.string().required().max(50),
    address: joi.string().required(),
    description: joi.string().required().max(500),
    price: joi.number().required().min(0),
    pics: joi.array().items(joi.string().required()),
    location: joi.object({
      city: joi.string().required().max(50),
      country: joi.string().required().max(50),
      latitude: joi.number().required(),
      longitude: joi.number().required(),
    }),
    propertyDetail: joi.object({
      size: joi.string().required(),
      rooms: joi.number().required().min(1),
      washRooms: joi.number().required().min(1),
      garage: joi.boolean().required(),
      garageSize: joi.string().required(),
      propertyType: joi.string().required(),
      yearBuilt: joi.string().required(),
    }),
  })
  .unknown(true);

const AddJoi = (req, res, next) => {
  const { error } = AddSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const floorPlansValidationSchema = joi
  .object({
    totalSize: joi.number(),
    roomSize: joi.number(),
    washroomSize: joi.number(),
    prices: joi.number(),
  })
  .unknown(true);

const floorPlansJoi = (req, res, next) => {
  const { error } = floorPlansValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

module.exports = { AddJoi, UserJoi, floorPlansJoi, BorkerJoi };
