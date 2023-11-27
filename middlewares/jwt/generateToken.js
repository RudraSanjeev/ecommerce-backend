const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_GENERATE_TOKEN_SEC,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

// RefreshToken
const refreshToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_TOKEN_SEC,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = {
  generateToken,
  refreshToken,
};
