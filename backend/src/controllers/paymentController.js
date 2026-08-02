// EcoMargin — Payment Controller (stub)
// src/controllers/paymentController.js
'use strict'
const asyncHandler = require('../utils/asyncHandler')

exports.createOrder     = asyncHandler(async (req, res) => { res.json({ message: 'createOrder — stub' }) })
exports.verifyPayment   = asyncHandler(async (req, res) => { res.json({ message: 'verifyPayment — stub' }) })
exports.getHistory      = asyncHandler(async (req, res) => { res.json({ message: 'paymentHistory — stub' }) })
exports.getInvoice      = asyncHandler(async (req, res) => { res.json({ message: `invoice ${req.params.id} — stub` }) })
exports.refundRequest   = asyncHandler(async (req, res) => { res.json({ message: `refund ${req.params.id} — stub' }) })
exports.razorpayWebhook = asyncHandler(async (req, res) => { res.json({ message: 'razorpayWebhook — stub' }) })
exports.stripeWebhook   = asyncHandler(async (req, res) => { res.json({ message: 'stripeWebhook — stub' }) })
