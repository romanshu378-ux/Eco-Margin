// EcoMargin — Booking Routes
// src/routes/bookingRoutes.js
'use strict'
const express = require('express')
const router  = express.Router()

router.get('/my-bookings', (req, res) => res.json({ message: 'my bookings — coming soon' }))
router.get('/',            (req, res) => res.json({ message: 'all bookings — coming soon' }))
router.get('/:id',         (req, res) => res.json({ message: `booking ${req.params.id} — coming soon` }))
router.post('/',           (req, res) => res.json({ message: 'create booking — coming soon' }))
router.patch('/:id/cancel',(req, res) => res.json({ message: `cancel booking ${req.params.id} — coming soon` }))

module.exports = router
