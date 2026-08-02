const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const stationRoutes = require('./stationRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const userRoutes = require('./userRoutes');

// Mount domain routes
router.get('/health', healthController.checkHealth);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/stations', stationRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/users', userRoutes);

module.exports = router;
