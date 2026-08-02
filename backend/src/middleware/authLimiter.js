// EcoMargin — Auth Rate Limiter Middleware
// src/middleware/authLimiter.js

'use strict'

const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 10, // max 10 failed/attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed authentication requests
})

module.exports = authLimiter
