

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const approvalRequired = (req, res, next) => {
  if (req.user.role !== 'admin' && !req.user.isApproved) {
    return res.status(403).json({ message: 'Account not approved yet' });
  }
  next();
};

const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

const validateToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    res.json({ valid: true });
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { authMiddleware, approvalRequired, roleMiddleware, validateToken };
