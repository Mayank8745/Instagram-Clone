const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/userController");

router.post("/createpost/:userId", createPost);

module.exports = router;
