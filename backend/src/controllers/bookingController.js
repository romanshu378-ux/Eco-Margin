// EcoMargin — Booking Controller (stub)
// src/controllers/bookingController.js
'use strict'
const asyncHandler = require('../utils/asyncHandler')

exports.getMyBookings  = asyncHandler(async (req, res) => { res.json({ message: 'getMyBookings — stub' }) })
exports.getAllBookings  = asyncHandler(async (req, res) => { res.json({ message: 'getAllBookings — stub' }) })
exports.getBookingById = asyncHandler(async (req, res) => { res.json({ message: `getBooking ${req.params.id} — stub` }) })
exports.createBooking  = asyncHandler(async (req, res) => { res.json({ message: 'createBooking — stub' }) })
exports.cancelBooking  = asyncHandler(async (req, res) => { res.json({ message: `cancelBooking ${req.params.id} — stub` }) })
