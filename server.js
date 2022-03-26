const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
require("ejs");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("view engine", "ejs");
app.use(morgan("dev"));

app.use("/api/v1/user", require("./routes/user.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then((success) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
