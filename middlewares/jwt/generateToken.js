const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_TOKEN_SEC,
    { expiresIn: process.env.JWT_TOKEN_EXP }
  );
  return token;
};

// generate reset token
const generateResetToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_RESET_TOKEN_SEC,
    { expiresIn: process.env.JWT_RESET_TOKEN_EXP }
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_TOKEN_SEC,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXP }
  );
  return token;
};

const generateRefreshAcessToken = (refreshToken) => {
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SEC, (err, user) => {
    if (err) {
      return new Error("token validation failed !");
    }
    return generateToken(user);
  });
};

module.exports = {
  generateToken,
  generateResetToken,
  generateRefreshAcessToken,
  generateRefreshToken,
};
