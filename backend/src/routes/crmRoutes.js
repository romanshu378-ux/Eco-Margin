// EcoMargin Backend — CRM Routes
// src/routes/crmRoutes.js
'use strict'

const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

// Protect all CRM routes
router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

// Quotations
router.post('/quotations', crmController.generateQuotation)
router.get('/quotations/lead/:leadId', crmController.getQuotationsByLead)
router.post('/quotations/:id/email', crmController.emailQuotation)

// Notes
router.post('/notes', crmController.addLeadNote)
router.get('/notes/lead/:leadId', crmController.getLeadNotes)

// Timeline
router.get('/timeline/lead/:leadId', crmController.getLeadTimeline)

// Notifications
router.get('/notifications', crmController.getNotifications)
router.put('/notifications/:id/read', crmController.markNotificationRead)

module.exports = router
