// EcoMargin Backend — Newsletter Routes
// src/routes/newsletterRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const newsletterController = require('../controllers/newsletterController')
const { protect, restrictTo } = require('../middleware/auth')

// Public subscription endpoint
router.post('/public', newsletterController.subscribeNewsletter)
router.post('/subscribe', newsletterController.subscribeNewsletter)

// Protected Admin REST Endpoints
router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

router.get('/', newsletterController.getAllSubscribers)
router.post('/', newsletterController.subscribeNewsletter)
router.delete('/:id', newsletterController.deleteSubscriber)
router.post('/bulk-delete', newsletterController.bulkDeleteSubscribers)

module.exports = router
