// EcoMargin — 404 Not Found Middleware
// src/middleware/notFound.js
'use strict'

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

module.exports = notFound
