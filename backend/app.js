const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var fileupload = require("express-fileupload");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());
app.use(cors());
app.use("/uploads/images", express.static("./uploads/images"));

if (process.env.DEVELOPMENT == "development") {
  app.use(morgan("dev"));
}

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

module.exports = app;
