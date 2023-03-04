const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

con.connect((err) => {
  if (err) {
    console.error(err);
    console.log("Connection with DB is Failed");
    return;
  }
  console.log("Connected to DB is Successful");
});

module.exports = con;
