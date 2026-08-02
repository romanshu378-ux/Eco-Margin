// EcoMargin — Station Controller (stub)
// src/controllers/stationController.js
'use strict'
const asyncHandler = require('../utils/asyncHandler')

exports.getAllStations    = asyncHandler(async (req, res) => { res.json({ message: 'getAllStations — stub' }) })
exports.getNearbyStations = asyncHandler(async (req, res) => { res.json({ message: 'getNearbyStations — stub' }) })
exports.searchStations    = asyncHandler(async (req, res) => { res.json({ message: 'searchStations — stub' }) })
exports.getStationById    = asyncHandler(async (req, res) => { res.json({ message: `getStation ${req.params.id} — stub` }) })
exports.getStationReviews = asyncHandler(async (req, res) => { res.json({ message: `getStationReviews ${req.params.id} — stub` }) })
exports.createStation     = asyncHandler(async (req, res) => { res.json({ message: 'createStation — stub' }) })
exports.updateStation     = asyncHandler(async (req, res) => { res.json({ message: 'updateStation — stub' }) })
exports.deleteStation     = asyncHandler(async (req, res) => { res.json({ message: 'deleteStation — stub' }) })
