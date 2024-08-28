const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  // Get the token from the authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Find the user corresponding to the decoded token
    User.findById(decoded.userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the user object to the request
      req.user = user;

      // Call the next middleware
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;