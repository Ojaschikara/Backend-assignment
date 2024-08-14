const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
