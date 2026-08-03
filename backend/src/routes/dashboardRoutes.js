// EcoMargin Backend — Dashboard Analytics Routes
// src/routes/dashboardRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')
const { protect, restrictTo } = require('../middleware/auth')

router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

router.get('/stats', dashboardController.getRealtimeStats)
router.get('/analytics', dashboardController.getAnalyticsCharts)
router.get('/activities', dashboardController.getRecentActivities)

module.exports = router
