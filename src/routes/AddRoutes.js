const { createAdd } = require("../controllers/AddController");
const { AddJoi } = require("../utils/Schemas");
const router = require("express").Router();

router.post("/create", AddJoi, createAdd);

module.exports = router;
