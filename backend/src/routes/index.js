const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const stationRoutes = require('./stationRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const userRoutes = require('./userRoutes');
const cmsRoutes = require('./cms.routes');
const publicRoutes = require('./public.routes');
const leadRoutes = require('./leadRoutes');
const dealerRoutes = require('./dealerRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const mediaController = require('../controllers/mediaController');

// Mount domain routes
router.get('/health', healthController.checkHealth);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/stations', stationRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/users', userRoutes);
router.use('/cms', cmsRoutes);
router.use('/public', publicRoutes);
router.use('/leads', leadRoutes);
router.use('/dealer-applications', dealerRoutes);
router.use('/newsletters', newsletterRoutes);

// Media Upload & Delete Endpoints
router.post('/media/upload', mediaController.uploadMedia);
router.post('/media/delete', mediaController.deleteMedia);

module.exports = router;
