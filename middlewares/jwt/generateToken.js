const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!user) {
    return new Error("Missing user object");
  }
  if (!user._id) {
    return new Error("Missing user._id");
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_TOKEN_SEC,
    { expiresIn: process.env.JWT_TOKEN_EXP }
  );
  return token;
};

// generate reset token
const generateResetToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_RESET_TOKEN_SEC,
    { expiresIn: process.env.JWT_RESET_TOKEN_EXP }
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_REFRESH_TOKEN_SEC,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXP }
  );
  return token;
};

const generateRefreshAcessToken = async (refreshToken) => {
  try {
    const user = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SEC
    );
    const newAccessToken = generateToken(user);
    return newAccessToken;
  } catch (err) {
    throw new Error("Token validation failed!");
  }
};

module.exports = {
  generateToken,
  generateResetToken,
  generateRefreshAcessToken,
  generateRefreshToken,
};
