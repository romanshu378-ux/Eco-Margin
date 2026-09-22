// EcoMargin Backend — Email Routes
// src/routes/emailRoutes.js
'use strict'

const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')
const { protect, restrictTo } = require('../middleware/auth')

// Protect all email routes
router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

router.post('/send', emailController.sendCustomEmail)
router.post('/customer', emailController.sendCustomerEmail)
router.post('/admin', emailController.sendAdminEmail)
router.get('/history/:leadId', emailController.getEmailHistoryByLead)
router.get('/history', emailController.getAllEmailLogs)

module.exports = router
