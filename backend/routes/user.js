const express = require("express");
const router = express.Router();

const { createPost, getAllPost } = require("../controllers/userController");

router.post("/createpost/:userId", createPost);
router.get("/allpost", getAllPost);

module.exports = router;
