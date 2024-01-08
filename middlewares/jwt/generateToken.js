const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const { _id, role } = user;
  if (!_id || !role) {
    // return "_id or role is empty !";
    return new Error("_id or role is empty !");
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

const generateRefreshAcessToken = (refreshToken) => {
  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SEC);
    const newAccessToken = generateToken(user);
    return newAccessToken;
  } catch (err) {
    console.log("some error occured sanjeev");
    throw err;
  }
};

module.exports = {
  generateToken,
  generateResetToken,
  generateRefreshAcessToken,
  generateRefreshToken,
};
