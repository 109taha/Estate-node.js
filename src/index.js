const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(
  cors({
    origin: "*",
  })
);

// connect mongodb
const connectToMongoDB = require("./config/connectMongdb");
connectToMongoDB();

// Port
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Real-Estate Server Is Running");
});

const user = require("./routes/UserRoutes");
const add = require("./routes/AddRoutes");
const review = require("./routes/AddReviewRoutes");

app.use("/user", user);
app.use("/add", add);
app.use("/review", review);
