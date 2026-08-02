// EcoMargin — Production CORS Configuration Module
// src/config/cors.js

'use strict'

require('dotenv').config()

// ── Whitelist of Allowed Production & Development Origins ──────────
const defaultAllowedOrigins = [
  'https://ecomargin.in',
  'https://www.ecomargin.in',
  'https://eco-margin-frontend.vercel.app',
  'https://eco-margin-admin-panel.vercel.app',
  'https://ecomargin.vercel.app',
  'https://ecomargin-admin.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]

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

// Consolidate unique allowed origins
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins, ...envClientUrls])]

/**
 * CORS Configuration Options for Express & Preflight OPTIONS Requests
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, cURL, Postman) with no origin header
    if (!origin) {
      return callback(null, true)
    }

    // Normalize origin by stripping trailing slashes
    const normalizedOrigin = origin.trim().replace(/\/+$/, '')

    if (allowedOrigins.includes(normalizedOrigin) || process.env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    console.warn(`⚠️ [CORS Blocked Origin]: ${origin}`)
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
    'Cache-Control',
    'Pragma',
    'Access-Control-Allow-Request-Method',
    'Access-Control-Allow-Request-Headers'
  ],
  exposedHeaders: ['Authorization', 'Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 204 // 204 No Content for preflight OPTIONS checks
}

module.exports = {
  corsOptions,
  allowedOrigins
}
