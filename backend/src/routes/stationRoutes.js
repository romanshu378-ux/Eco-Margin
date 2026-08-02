// EcoMargin — Station Routes
// src/routes/stationRoutes.js
'use strict'
const express = require('express')
const router  = express.Router()

// GET    /api/v1/stations         — list all stations (with filters, pagination)
router.get('/',           (req, res) => res.json({ message: 'stations list — coming soon' }))
// GET    /api/v1/stations/nearby  — stations near lat/lng
router.get('/nearby',     (req, res) => res.json({ message: 'stations nearby — coming soon' }))
// GET    /api/v1/stations/search  — full-text search
router.get('/search',     (req, res) => res.json({ message: 'stations search — coming soon' }))
// GET    /api/v1/stations/:id     — station detail
router.get('/:id',        (req, res) => res.json({ message: `station ${req.params.id} — coming soon` }))
// GET    /api/v1/stations/:id/reviews
router.get('/:id/reviews',(req, res) => res.json({ message: `station ${req.params.id} reviews — coming soon` }))
// POST   /api/v1/stations         — create station (admin/operator)
router.post('/',          (req, res) => res.json({ message: 'create station — coming soon' }))
// PUT    /api/v1/stations/:id     — update station
router.put('/:id',        (req, res) => res.json({ message: 'update station — coming soon' }))
// DELETE /api/v1/stations/:id     — delete station
router.delete('/:id',     (req, res) => res.json({ message: 'delete station — coming soon' }))

module.exports = router
