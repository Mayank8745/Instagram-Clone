const util = require("util");
const dbConnection = require("../databaseConnection/dbConnection");
const dbQuery = require("../databaseConnection/database_query");
const queryProcess = util.promisify(dbConnection.query).bind(dbConnection);
const uploadPath = "/uploads/images/";

const singleUploadFile = async (file, user_id, post_id) => {
  try {
    const filename = user_id + "_" + post_id + "_" + file.name;

    file.mv(uploadPath + filename, async (err) => {
      if (err) {
        throw err;
      }

      const query = dbQuery.InsertImage;
      const newImage = await queryProcess(query, [
        user_id,
        post_id,
        uploadPath + filename,
      ]);
      return;
    });
  } catch (err) {
    console.error(err);
    return l;
  }
};

exports.createPost = async (req, res) => {
  try {
    var caption;
    if (req.body == undefined) {
      caption = null;
    } else {
      caption = req.body.caption;
    }

    const user_id = BigInt(req.params.userId);

    var image_count;
    if (req.files == null) {
      image_count = 0;
    } else if (req.files.images.length > 1) {
      image_count = req.files.images.length;
    } else {
      image_count = 1;
    }

    const query = dbQuery.InsertPost;
    const newPost = await queryProcess(query, [user_id, caption, image_count]);
    if (req.files !== null && req.files.images.length > 1) {
    } else if (req.files !== null && typeof req.files.images == "object") {
      await singleUploadFile(req.files.images, user_id, newPost.insertId);
    }
    return res.json({
      message: "Post Created Successfully",
    });
  } catch (err) {}
};
