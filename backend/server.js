const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const { requestIdMiddleware, globalErrorHandler } = require('./middleware/errorHandler');
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

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
const schoolProfileRoutes = require('./routes/schoolProfiles');
const childrenRoutes = require('./routes/children');
const feeCategoryRoutes = require('./routes/feeCategories');
const scheduledPaymentRoutes = require('./routes/scheduledPayments');

// Demo routes
const mockWebhookRoutes = require('./routes/mockWebhook');

// Safe School routes
const attendanceRoutes = require('./routes/attendance');
const passphraseRoutes = require('./routes/passphrase');
const emergencyAlertRoutes = require('./routes/emergencyAlerts');
const gateAccessRoutes = require('./routes/gateAccess');

// Financial Literacy routes
const kudiCoinRoutes = require('./routes/kudiCoins');
const savingsGoalRoutes = require('./routes/savingsGoals');
const quizRoutes = require('./routes/quizzes');
const leaderboardRoutes = require('./routes/leaderboard');
const achievementRoutes = require('./routes/achievements');

// Meal Management routes
const menuRoutes = require('./routes/menus');
const mealOrderRoutes = require('./routes/mealOrders');
const canteenRoutes = require('./routes/canteen');
const dietaryPreferenceRoutes = require('./routes/dietaryPreferences');

// Core routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/school-profiles', schoolProfileRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/fee-categories', feeCategoryRoutes);
app.use('/api/scheduled-payments', scheduledPaymentRoutes);

// Demo routes
app.use('/api/mock-paystack', mockWebhookRoutes);

// Safe School routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/passphrases', passphraseRoutes);
app.use('/api/emergency-alerts', emergencyAlertRoutes);
app.use('/api/gate-access', gateAccessRoutes);

// Financial Literacy routes
app.use('/api/kudi-coins', kudiCoinRoutes);
app.use('/api/savings-goals', savingsGoalRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/achievements', achievementRoutes);

// Meal Management routes
app.use('/api/menus', menuRoutes);
app.use('/api/meal-orders', mealOrderRoutes);
app.use('/api/canteen', canteenRoutes);
app.use('/api/dietary-preferences', dietaryPreferenceRoutes);

// Demo controls
const demoControlRoutes = require('./routes/demoControls');
app.use('/api/demo', demoControlRoutes);

// Global error handler (must be AFTER all routes)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

// Payment scheduling cron jobs
const cron = require('node-cron');
const { processDuePayments, recoverStaleLocks } = require('./services/paymentScheduler');

let paymentCron;
let staleLockCron;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Process due scheduled payments every 15 minutes
    paymentCron = cron.schedule('*/15 * * * *', async () => {
      console.log('[Cron] Processing due scheduled payments...');
      try {
        const results = await processDuePayments();
        console.log(`[Cron] Payment processing done: ${JSON.stringify(results)}`);
      } catch (error) {
        console.error('[Cron] Payment processing error:', error.message);
      }
    });

    // Recover stale processing locks every 60 minutes
    staleLockCron = cron.schedule('0 * * * *', async () => {
      console.log('[Cron] Recovering stale payment locks...');
      try {
        const recovered = await recoverStaleLocks();
        if (recovered > 0) {
          console.log(`[Cron] Recovered ${recovered} stale locks`);
        }
      } catch (error) {
        console.error('[Cron] Stale lock recovery error:', error.message);
      }
    });

    console.log('[Cron] Payment scheduler registered (every 15 min)');
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n[${signal}] Shutting down gracefully...`);
    if (paymentCron) paymentCron.stop();
    if (staleLockCron) staleLockCron.stop();
    console.log('[Cron] Cron jobs stopped');
    server.close(() => {
      console.log('[Server] HTTP server closed');
      mongoose.connection.close(false).then(() => {
        console.log('[DB] MongoDB connection closed');
        process.exit(0);
      });
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
});
