// EcoMargin Backend — Dealer Application Routes
// src/routes/dealerRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const dealerController = require('../controllers/dealerController')
const { protect, restrictTo } = require('../middleware/auth')

// Public submission endpoints
router.post('/public', dealerController.createDealer)
router.post('/apply', dealerController.createDealer)

// Protected Admin REST Endpoints
router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

router.get('/', dealerController.getAllDealers)
router.get('/:id', dealerController.getDealerById)
router.post('/', dealerController.createDealer)
router.put('/:id', dealerController.updateDealer)
router.patch('/:id/status', dealerController.updateDealerStatus)
router.delete('/:id', dealerController.deleteDealer)
router.post('/bulk-delete', dealerController.bulkDeleteDealers)

module.exports = router
