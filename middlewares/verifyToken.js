const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(401).json("invalid token !");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("You are not authenticated !");
  }
  const token = authHeader.split(" ")[1];
};
