const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      });
      console.log('MongoDB connected successfully');
    } else {
      console.log('MongoDB URI not configured, running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Server will start without database. Authentication will not work until MongoDB is configured.');
    console.log('Please install MongoDB locally or use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)');
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthCheck = {
    status: 'ok',
    message: 'Kudegowo API is running',
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000
  };
  
  res.json(healthCheck);
});

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const itemRoutes = require('./routes/items');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
