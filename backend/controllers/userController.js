const util = require("util");
const dbConnection = require("../databaseConnection/dbConnection");
const {
  dbQuery,
  convertSqlToJSON,
} = require("../databaseConnection/database_query");
const queryProcess = util.promisify(dbConnection.query).bind(dbConnection);
const uploadPath = "uploads/images/";

const fileNameChange = (file) => {
  const whitespaceRegExp = / /g;
  const change = file.replace(whitespaceRegExp, "_");
  return change;
};

const singleUploadFile = async (file, user_id, post_id) => {
  try {
    const file_name = fileNameChange(file.name);
    const filename = user_id + "_" + post_id + "_" + file_name;

    file.mv(uploadPath + filename, async (err) => {
      if (err) {
        throw err;
      }

      const query = dbQuery.InsertImage;
      const newImage = await queryProcess(query, [
        user_id,
        post_id,
        file_name,
        uploadPath + filename,
      ]);
      return;
    });
  } catch (err) {
    console.error(err);
    return l;
  }
};

const multiFileUpload = async (files, user_id, post_id) => {
  try {
    files.map((file) => {
      const file_name = fileNameChange(file.name);
      const filename = user_id + "_" + post_id + "_" + file_name;
      file.mv(uploadPath + filename, async (err) => {
        if (err) {
          throw err;
        }
        const query = dbQuery.InsertImage;
        const newImage = await queryProcess(query, [
          user_id,
          post_id,
          file_name,
          uploadPath + filename,
        ]);
      });
    });
  } catch (err) {
    console.error(err);
    return;
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
      await multiFileUpload(req.files.images, user_id, newPost.insertId);
    } else if (req.files !== null && typeof req.files.images == "object") {
      await singleUploadFile(req.files.images, user_id, newPost.insertId);
    }
    return res.json({
      message: "Post Created Successfully",
    });
  } catch (err) {}
};

exports.getAllPost = async (req, res) => {
  try {
    const postQuery = dbQuery.getAllPost;
    var postdata = await queryProcess(postQuery);
    postdata = convertSqlToJSON(postdata);

    const imageQuery = dbQuery.fetchImage;
    var imageData = await queryProcess(imageQuery);
    imageData = convertSqlToJSON(imageData);

    const likeQuery = dbQuery.getAllLikes;
    var likeData = await queryProcess(likeQuery);
    likeData = convertSqlToJSON(likeData);

    var finalResult = [];

    postdata.map((post) => {
      if (post.image_count > 0) {
        var imagesPresent = imageData.filter((data) => {
          return post.id == data.post_id;
        });
        post["imagesData"] = imagesPresent;
      }

      var likePresent = likeData.filter((data) => {
        return post.id == data.post_id && post.user_id == data.user_id;
      });

      if (likePresent.length > 0) {
        post["likeData"] = likePresent;
      }

      finalResult.push(post);
    });
    return res.json({
      finalResult,
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.likePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    var query = dbQuery.checkLike + `${userId}` + ` and post_id = ${postId}`;

    var data = await queryProcess(query, [userId, postId]);

    if (data[0] !== undefined) {
      query = dbQuery.dislikePost + `${userId}` + ` and post_id = ${postId}`;
      data = await queryProcess(query);
      return res.json({
        message: "Dislike post",
      });
    }

    query = dbQuery.InsertLike;
    data = await queryProcess(query, [userId, postId]);
    return res.json({
      message: "Like for the Post is Created",
    });
  } catch (err) {
    console.error(err);
    return;
  }
};
