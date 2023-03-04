const util = require("util");
const bcrypt = require("bcrypt");

const dbConnection = require("../databaseConnection/dbConnection");
const { dbQuery } = require("../databaseConnection/database_query");

const queryProcess = util.promisify(dbConnection.query).bind(dbConnection);

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = dbQuery.fetchUser + `"${email}";`;
    console.log(query);

    const data = await queryProcess(query);
    console.log(data);

    if (!(await bcrypt.compare(password, data[0].password))) {
      return res.json({
        message: "Incorrect UserName and Password",
      });
    }

    return res.json({
      message: "Logged In SuccessFully",
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.signupController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    var query = dbQuery.fetchUser + `"${email}";`;
    var allUser = await queryProcess(query);
    if (!allUser) {
      return res.json({
        message: "Account Already exists",
      });
    }

    query = dbQuery.fetchUserName + `"${userName}";`;
    allUser = await queryProcess(query);
    if (!allUser) {
      return res.json({
        message: "Account Already exists",
      });
    }

    const passwordUpdate = await bcrypt.hash(password, 12);
    query = dbQuery.insertUser;
    const user = await queryProcess(query, [userName, email, passwordUpdate]);
    return res.json({
      message: "User Account Created successfully",
    });
  } catch (err) {
    console.error(err);
    return;
  }
};
