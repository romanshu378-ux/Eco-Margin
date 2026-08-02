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

const logger = require('./config/logger')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const routes = require('./routes')

const app = express()

// ── Enable Trust Proxy for Render / Vercel Load Balancers ─────────
app.set('trust proxy', 1)

// ── Security Headers (Helmet) ──────────────────────────────────
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

// ── Production CORS Configuration ──────────────────────────────
const clientUrls = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

const allAllowedOrigins = [...new Set([...clientUrls, ...allowedOrigins, 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'])]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (Postman/cURL) or requests from whitelisted origins
      if (!origin || allAllowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true)
      } else {
        console.warn(`⚠️ [CORS Blocked]: ${origin}`)
        callback(new Error(`CORS Error: Origin ${origin} not permitted`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
)

// ── Global Rate Limiter ───────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  message: { success: false, message: 'Too many requests from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', globalLimiter)

// ── Body Parsing & Performance Optimizations ──────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(compression()) // Enable Gzip/Deflate compression
app.use(hpp()) // Prevent HTTP Parameter Pollution

// ── Morgan Logging (Render & Cloud Logs) ──────────────────────
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

// ── Static Files ──────────────────────────────────────────────
app.use('/uploads', express.static('uploads'))

// ── API Routes ────────────────────────────────────────────────
app.use('/api/v1', routes)

// ── Health Check Endpoint for Render ──────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '⚡ EcoMargin Production API (TiDB Cloud + Cloudinary) is running',
    version: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

// ── 404 & Global Error Handling ───────────────────────────────
app.use(notFound)
app.use(errorHandler)

module.exports = app
