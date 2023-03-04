const util = require("util");
const bcrypt = require("bcrypt");

const dbConnection = require("../databaseConnection/dbConnection");
const dbQuery = require("../databaseConnection/database_query");

const query = util.promisify(dbConnection.query).bind(dbConnection);

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const qury = dbQuery.fetchUser + `"${email}";`;
    console.log(qury);

    const data = await query(qury);

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
    const allUser = await query(`SELECT * FROM USERS WHERE email="${email}";`);
    if (!allUser) {
      return res.json({
        message: "Account Already exists",
      });
    }

    const passwordUpdate = await bcrypt.hash(password, 12);
    const qury = dbQuery.insertUser;
    const user = await query(qury, [userName, email, passwordUpdate]);
    return res.json({
      message: "User Account Created successfully",
    });
  } catch (err) {
    console.error(err);
    return;
  }
};
