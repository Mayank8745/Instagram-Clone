const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPost,
  likePost,
} = require("../controllers/userController");

router.post("/createpost/:userId", createPost);
router.post("/:userId/like/:postId", likePost);
router.get("/allpost", getAllPost);

module.exports = router;
