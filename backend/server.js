const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const dbconnection = require("./databaseConnection/dbConnection");
const app = require("./app");

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Internal Error cannot able to start the server");
    return;
  }
  console.log(`Server is Started and Running at Port: ${process.env.PORT}`);
});
