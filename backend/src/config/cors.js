// EcoMargin — Production CORS Configuration Module
// src/config/cors.js

'use strict'

// Parse origins from environment variables (ALLOWED_ORIGINS and CLIENT_URL)
const parseEnvOrigins = (envVar) => {
  if (!envVar) return []
  return envVar
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, '')) // Trim whitespace & trailing slashes
    .filter(Boolean)
}

const envAllowedOrigins = parseEnvOrigins(process.env.ALLOWED_ORIGINS)
const envClientUrls = parseEnvOrigins(process.env.CLIENT_URL)

// Consolidate unique allowed origins loaded strictly from environment variables
const allowedOrigins = [...new Set([...envAllowedOrigins, ...envClientUrls])]

/**
 * CORS Configuration Options for Express & Preflight OPTIONS Requests
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, server-to-server, cURL, Postman) with no origin header
    if (!origin) {
      return callback(null, true)
    }

    // Normalize origin by stripping trailing slashes
    const normalizedOrigin = origin.trim().replace(/\/+$/, '')

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true)
    } else {
      console.warn(`⚠️ [CORS Blocked Origin]: ${origin}`)
      return callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'Pragma',
    'Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Request-Headers'
  ],
  exposedHeaders: ['Authorization', 'Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200 // 200 OK for preflight OPTIONS checks
}

module.exports = {
  corsOptions,
  allowedOrigins
}
