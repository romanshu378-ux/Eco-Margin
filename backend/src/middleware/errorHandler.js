// EcoMargin — Global Error Handler Middleware
// src/middleware/errorHandler.js

'use strict'

const logger = require('../config/logger')

// ── Custom App Error Class ────────────────────────────────────
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

// ── Global Error Handler ──────────────────────────────────────
const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err

  // Log error
  logger.error({
    message: err.message,
    stack:   err.stack,
    url:     req.originalUrl,
    method:  req.method,
    ip:      req.ip,
  })

  // ── Sequelize Validation Error ─────────────────────────────
  if (err.name === 'SequelizeValidationError') {
    statusCode = 422
    message = err.errors.map((e) => e.message).join(', ')
  }

  // ── Sequelize Unique Constraint ────────────────────────────
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409
    message = 'A record with this value already exists.'
  }

  // ── JWT Errors ─────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError')  { statusCode = 401; message = 'Invalid token.' }
  if (err.name === 'TokenExpiredError')  { statusCode = 401; message = 'Token expired.' }

  // ── Multer Errors ──────────────────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') { statusCode = 413; message = 'File too large.' }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
module.exports.AppError = AppError
