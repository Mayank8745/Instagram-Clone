const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const morgan = require("morgan");
var fileupload = require("express-fileupload");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static("/uploads"));

if (process.env.DEVELOPMENT == "development") {
  app.use(morgan("dev"));
}

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

module.exports = app;
