// EcoMargin — Production CORS Configuration Module
// src/config/cors.js

'use strict'

require('dotenv').config()

// ── Whitelist of Allowed Production & Development Origins ──────────
const defaultAllowedOrigins = [
  'https://eco-margin-frontend.vercel.app',
  'https://eco-margin-admin-panel.vercel.app',
  'https://ecomargin.vercel.app',
  'https://ecomargin-admin.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5173',
]

// Parse origins from environment variables (CLIENT_URL and ALLOWED_ORIGINS)
const parseEnvOrigins = (envVar) => {
  if (!envVar) return []
  return envVar
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, '')) // Trim whitespace & trailing slashes
    .filter(Boolean)
}

const envClientUrls = parseEnvOrigins(process.env.CLIENT_URL)
const envAllowedOrigins = parseEnvOrigins(process.env.ALLOWED_ORIGINS)

// Consolidate unique allowed origins
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envClientUrls, ...envAllowedOrigins])]

/**
 * CORS Configuration Options for Express & Preflight OPTIONS Requests
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, cURL, Postman requests with no origin header
    if (!origin) {
      return callback(null, true)
    }

    // Normalize origin by stripping trailing slashes
    const normalizedOrigin = origin.trim().replace(/\/+$/, '')

    if (allowedOrigins.includes(normalizedOrigin) || process.env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    console.warn(`⚠️ [CORS Blocked Origin]: ${origin}`)
    // Return callback(null, false) instead of callback(new Error) to prevent 500 error on preflight OPTIONS
    return callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Request-Headers',
  ],
  exposedHeaders: ['Authorization', 'Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 204, // 204 No Content for preflight OPTIONS checks
}

module.exports = {
  corsOptions,
  allowedOrigins,
}
