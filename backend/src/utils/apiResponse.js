// EcoMargin — API Response Helpers
// src/utils/apiResponse.js
'use strict'

const successResponse = (res, { message = 'Success', data = null, meta = null, statusCode = 200 } = {}) => {
  const payload = { success: true, message }
  if (data !== null)  payload.data = data
  if (meta !== null)  payload.meta = meta
  return res.status(statusCode).json(payload)
}

const createdResponse = (res, { message = 'Created successfully', data = null } = {}) =>
  successResponse(res, { message, data, statusCode: 201 })

const paginatedResponse = (res, { message = 'Success', data, page, limit, total }) =>
  successResponse(res, {
    message, data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })

module.exports = { successResponse, createdResponse, paginatedResponse }
