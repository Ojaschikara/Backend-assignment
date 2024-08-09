const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/refresh-token', refreshToken);

module.exports = router;
