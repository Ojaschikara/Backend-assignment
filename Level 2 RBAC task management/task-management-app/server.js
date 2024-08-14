const express = require('express');
const logger = require('./config/logger');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const validationMiddleware = require('./middleware/validationMiddleware');
const rateLimiter = require('./utils/rateLimiter');
require('dotenv').config();


dotenv.config();
const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(validationMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', rateLimiter, taskRoutes);
app.use('/api/users', rateLimiter, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
