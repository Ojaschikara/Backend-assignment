const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tasks/:userId', authMiddleware, userController.getUserTasks);
router.get('/admin/dashboard', authMiddleware, userController.getAdminDashboard);
router.patch('/toggle-status/:id', authMiddleware, userController.toggleUserStatus);

module.exports = router;
