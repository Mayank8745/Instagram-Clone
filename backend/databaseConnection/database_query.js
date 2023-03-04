const dbQuery = {
  insertUser: `INSERT INTO USERS VALUES(NULL, ?, ?, ?, NOW());`,
  InsertPost: "INSERT INTO POST VALUES(NULL, ?, ?, ?)",
  InsertImage: "INSERT INTO photos VALUES(NULL, ?, ?, ?)",

  fetchUser: `SELECT * FROM USERS WHERE email=`,
  fetchImage: "SELECT * FROM photos;",
  getAllPost: "SELECT * FROM POST ORDER BY id DESC;",
};

const convertSqlToJSON = (results) => {
  results = results.map((v) => Object.assign({}, v));
  return results;
};

module.exports = { dbQuery, convertSqlToJSON };
