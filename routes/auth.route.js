const {
  register,
  login,
  logout,
  resetPassword,
  updatePassword,
} = require("../controllers/auth.controller");

const router = require("express").Router();

//register
router.post("/register", register);
//login
router.post("/login", login);
// logout
router.post("/logout", logout);

// reset password
router.post("/reset-password", resetPassword);

// update password - using reset password link
router.post("/update-password/:resetToken", updatePassword);

module.exports = router;
