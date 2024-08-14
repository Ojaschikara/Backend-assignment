const User = require('../models/User');
const Task = require('../models/Task');

exports.getUserTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const tasks = await Task.find();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const averageCompletionRate = (completedTasks / totalTasks) * 100;
    res.json({
      totalTasks,
      completedTasks,
      averageCompletionRate: averageCompletionRate.toFixed(2),
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
