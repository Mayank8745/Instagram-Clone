const express = require("express");
const router = express.Router();

const {
  loginController,
  signupController,
} = require("../controllers/authController");

router.post("/login", loginController);
router.post("/signin", signupController);

module.exports = router;
