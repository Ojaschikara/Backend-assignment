const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Protect all routes except homepage
app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
