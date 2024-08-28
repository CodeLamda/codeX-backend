const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    User.findById(decoded.userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;