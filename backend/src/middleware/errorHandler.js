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
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Log error using winston or console logger
  if (logger && typeof logger.error === 'function') {
    logger.error({
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    })
  } else {
    console.error(`❌ [Error ${statusCode}]: ${req.method} ${req.originalUrl} — ${err.message}`)
  }

  // ── Database Errors (Sequelize / TiDB Cloud) ────────────────
  if (err.name === 'SequelizeValidationError') {
    statusCode = 422
    message = err.errors ? err.errors.map((e) => e.message).join(', ') : 'Database validation failed'
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409
    message = 'A record with this unique attribute already exists.'
  }
  if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefusedError') {
    statusCode = 503
    message = 'Database service temporarily unavailable. Please try again shortly.'
  }
  if (err.name === 'SequelizeDatabaseError') {
    statusCode = 400
    message = 'Invalid database query or data format.'
  }

  // ── Cloudinary Upload Errors ───────────────────────────────
  if (err.name === 'CloudinaryError' || (err.http_code && err.message?.includes('Cloudinary'))) {
    statusCode = 500
    message = `Cloud Storage Error: ${err.message}`
  }

  // ── JWT Authorization Errors ───────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid authentication token. Please log in again.'
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Your session has expired. Please log in again.'
  }

  // ── Multer File Upload Errors ──────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413
    message = 'Uploaded file exceeds the maximum allowed size limit of 5MB.'
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400
    message = 'Unexpected file field in upload request.'
  }

  // ── Production JSON Response Safety ─────────────────────────
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
module.exports.AppError = AppError
