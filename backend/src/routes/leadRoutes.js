// EcoMargin Backend — Lead Routes
// src/routes/leadRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const leadController = require('../controllers/leadController')
const { protect, restrictTo } = require('../middleware/auth')

// Public POST endpoint for submitting web inquiries & RFQs
router.post('/public', leadController.createLead)
router.post('/', leadController.createLead)

// Protected Admin REST Endpoints
router.use(protect)
router.use(restrictTo('superadmin', 'admin'))

router.get('/', leadController.getAllLeads)
router.get('/:id', leadController.getLeadById)
router.put('/:id', leadController.updateLead)
router.patch('/:id/status', leadController.updateLeadStatus)
router.delete('/:id', leadController.deleteLead)

module.exports = router
