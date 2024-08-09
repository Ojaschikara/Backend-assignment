const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });

  try {
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ success: false, message: 'Invalid token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
