const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("token validation failed !");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated !");
  }
};

const verifyAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.userId || req.user.role == "admin") {
      next();
    } else {
      return res.status(403).json("You are not allow to do this !");
    }
  });
};

const verifyAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      return res.status(403).json("Only admin can person this task !");
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorize, verifyAndAdmin };
