// EcoMargin — Express Application (Production Hardened for Render & TiDB Cloud)
// src/app.js

'use strict'

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')

const { corsOptions } = require('./config/cors')
const logger = require('./config/logger')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const routes = require('./routes')

const app = express()

// ── Enable Trust Proxy for Render / Vercel Load Balancers ─────────
app.set('trust proxy', 1)

// ── 1. EARLY CORS MIDDLEWARE & PREFLIGHT OPTIONS HANDLER ──────────
// Must be registered BEFORE Helmet, rate limiters, and route handlers
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// ── 2. SECURITY HEADERS (HELMET) ──────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'https://res.cloudinary.com'],
        connectSrc: ["'self'", 'https:', 'http://localhost:5000', 'http://localhost:3000', 'http://localhost:3001'],
      },
    },
    frameguard: { action: 'deny' },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
)

// ── 3. GLOBAL RATE LIMITER ────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  message: { success: false, message: 'Too many requests from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', globalLimiter)

// ── 4. BODY PARSING & PERFORMANCE OPTIMIZATIONS ───────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(compression()) // Enable Gzip/Deflate compression
app.use(hpp()) // Prevent HTTP Parameter Pollution

// ── 5. MORGAN LOGGING (Render Cloud Logs) ─────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream: {
        write: (msg) => {
          if (logger && typeof logger.http === 'function') {
            logger.http(msg.trim())
          } else {
            console.log(`📡 [Render HTTP]: ${msg.trim()}`)
          }
        },
      },
    })
  )
}

// ── 6. STATIC FILES ───────────────────────────────────────────────
app.use('/uploads', express.static('uploads'))

// ── 7. API ROUTES ─────────────────────────────────────────────────
app.use('/api/v1', routes)

// ── 8. ROOT HEALTH CHECK FOR RENDER ───────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '⚡ EcoMargin Production API (CORS Preflight Hardened) is running',
    version: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

// ── 9. ERROR HANDLING ─────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

module.exports = app
