const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRATION);
    const refreshToken = createToken(user, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRATION);

    res.status(200).json({ success: true, token, refreshToken });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;

  try {
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newToken = createToken({ id: decoded.id, username: decoded.username }, process.env.JWT_SECRET, process.env.JWT_EXPIRATION);

    res.status(200).json({ success: true, token: newToken });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
