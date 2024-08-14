const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
