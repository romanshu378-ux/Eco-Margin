// EcoMargin — Payment Routes
// src/routes/paymentRoutes.js
'use strict'
const express = require('express')
const router  = express.Router()

router.post('/create-order',       (req, res) => res.json({ message: 'create order — coming soon' }))
router.post('/verify',             (req, res) => res.json({ message: 'verify payment — coming soon' }))
router.get('/history',             (req, res) => res.json({ message: 'payment history — coming soon' }))
router.get('/:id/invoice',         (req, res) => res.json({ message: `invoice ${req.params.id} — coming soon` }))
router.post('/:id/refund',         (req, res) => res.json({ message: `refund ${req.params.id} — coming soon` }))
router.post('/webhook/razorpay',   (req, res) => res.json({ message: 'razorpay webhook — coming soon' }))
router.post('/webhook/stripe',     (req, res) => res.json({ message: 'stripe webhook — coming soon' }))

module.exports = router
