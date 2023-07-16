const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
};
