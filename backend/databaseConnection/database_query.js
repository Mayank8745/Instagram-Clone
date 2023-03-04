const dbQuery = {
  insertUser: `INSERT INTO USERS VALUES(NULL, ?, ?, ?, NOW());`,
  InsertPost: "INSERT INTO POST VALUES(NULL, ?, ?, ?)",
  InsertImage: "INSERT INTO photos VALUES(NULL, ?, ?, ?, ?)",
  InsertLike: "INSERT INTO LIKEPOST VALUES(NULL, ?, ?)",
  dislikePost: `delete from LIKEPOST where user_id = `,

  checkLike: "SELECT * FROM LIKEPOST where user_id = ",
  fetchUserName: `SELECT * FROM USERS WHERE userName=`,
  fetchUser: `SELECT * FROM USERS WHERE email=`,
  fetchImage: "SELECT * FROM photos;",
  getAllLikes: "SELECT * FROM LIKEPOST",
  getAllPost: `SELECT POST.*, USERS.userName from POST join USERS where POST.user_id = USERS.id
                ORDER By post.id DESC;`,
};

const convertSqlToJSON = (results) => {
  results = results.map((v) => Object.assign({}, v));
  return results;
};

module.exports = { dbQuery, convertSqlToJSON };
