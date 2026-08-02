// EcoMargin — Standardized API Response Utilities
// src/utils/apiResponse.js

'use strict'

/**
 * Standardized Success Response
 * @param {object} res - Express Response object
 * @param {string} message - Human-readable success message
 * @param {any} data - Payload data
 * @param {number} statusCode - HTTP Status code (default 200)
 */
const successResponse = (res, message = 'Success', data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  })
}

/**
 * Standardized Paginated Response with Search, Filtering & Sorting Metadata
 * @param {object} res - Express Response object
 * @param {array} data - Array of item records
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total count of matching items
 * @param {object} extraMeta - Search/Filter/Sort query parameters used
 */
const paginateResponse = (res, data, page = 1, limit = 10, totalItems = 0, extraMeta = {}) => {
  const totalPages = Math.ceil(totalItems / limit) || 1
  
  return res.status(200).json({
    success: true,
    message: 'Data retrieved successfully',
    data,
    meta: {
      currentPage: Number(page),
      pageSize: Number(limit),
      totalItems: Number(totalItems),
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      search: extraMeta.search || null,
      filter: extraMeta.filter || null,
      sortBy: extraMeta.sortBy || null,
      sortOrder: extraMeta.sortOrder || 'ASC'
    },
    timestamp: new Date().toISOString()
  })
}

/**
 * Standardized Error Response
 * @param {object} res - Express Response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP Status code (default 500)
 * @param {any} errors - Validation errors or details
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { timestamp: new Date().toISOString() })
  })
}

module.exports = {
  successResponse,
  paginateResponse,
  errorResponse
}
