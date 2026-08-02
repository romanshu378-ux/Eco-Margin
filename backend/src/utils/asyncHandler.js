// EcoMargin — asyncHandler Utility
// src/utils/asyncHandler.js
'use strict'

/**
 * Wraps async route handlers to avoid try/catch boilerplate.
 * Passes errors to Express's next() for centralized handling.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler
