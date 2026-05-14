const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header (Bearer TOKEN)
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user info to request (optional, depends on your needs)
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = { protect };