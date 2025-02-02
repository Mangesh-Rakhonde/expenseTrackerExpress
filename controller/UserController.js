
const User = require('../models/User');
const TokenManager = require('../utils/TokenManager');

class UserController {

  async authMe(req,res){
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('No token provided');
      const decoded = TokenManager.verifyToken(token);
      const user = await User.findById(decoded.id);
      if (!user) throw new Error('User not found');
      res.json({ message: 'User authenticated', user });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  }
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.createUser({ name, email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: 'Error registering user', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await User.validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = TokenManager.generateToken({ email: user.email });
      res.status(200).json({ message: 'Login successful', token ,user});//user 
    } catch (error) {
      res.status(400).json({ message: 'Error logging in', error: error.message });
    }
  }
}

module.exports = new UserController();
