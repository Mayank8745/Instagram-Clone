const query = {
  insertUser: `INSERT INTO USERS VALUES(NULL, ?, ?, ?, NOW());`,
  fetchUser: `SELECT * FROM USERS WHERE email=`,
  InsertPost: "INSERT INTO POST VALUES(NULL, ?, ?, ?)",
  InsertImage: "INSERT INTO photos VALUES(NULL, ?, ?, ?)",
};

module.exports = query;
