const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("invalid token ");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const verifyAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allow to do that.");
    }
  });
};

// for product and user { only admin can add new product and user.}
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allow to do that.");
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorize, verifyTokenAndAdmin };
