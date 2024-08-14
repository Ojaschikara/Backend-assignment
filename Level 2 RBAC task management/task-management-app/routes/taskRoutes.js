const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.patch('/:id', authMiddleware, taskController.updateTaskStatus);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
