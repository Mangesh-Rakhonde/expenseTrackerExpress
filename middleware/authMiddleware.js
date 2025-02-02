

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenManager = require('../utils/TokenManager');

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('No token provided');
      
      const decoded = TokenManager.verifyToken(token);
     
      const user = await User.findUserByEmail(decoded.email);
      
      if (!user) throw new Error('Invalid token');

      req.user = user; // Attach user to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  }
}

module.exports = new AuthMiddleware();
