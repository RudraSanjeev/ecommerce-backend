const router = require("express").Router();
const {
  register,
  login,
  updatePassword,
  resetPassword,
} = require("../controllers/auth.controller.js");

// register
router.post("/register", register);

// login
router.post("/login", login);

// reset
router.post("/reset", resetPassword);

// update password
router.patch("/update-password/:token", updatePassword);

module.exports = router;
