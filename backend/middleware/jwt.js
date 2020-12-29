const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "JWT required" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid JWT" });
      } else {
        req.user = user.user;
        next();
      }
    });
  }
};

module.exports = validateJWT;
