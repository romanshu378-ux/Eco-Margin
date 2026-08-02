// EcoMargin — Express Application (Production Security Hardened)
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

// ── Trust Proxy (for Render/Vercel) ───────────────────────────
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
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'", 'http://localhost:5000', 'http://localhost:3000', 'http://localhost:3001'],
      },
    },
    frameguard: { action: 'deny' }, // Prevent Clickjacking
    xssFilter: true, // XSS Header
    noSniff: true, // Prevent MIME sniffing
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
)

// ── CORS Configuration ─────────────────────────────────────────
const defaultAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173']
const envOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const allowedOrigins = envOrigins.length > 0 ? envOrigins : defaultAllowedOrigins

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true)
      } else {
        callback(new Error(`CORS Error: Origin ${origin} not permitted`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)

// ── Global Rate Limiter ───────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', globalLimiter)

// ── Body Parsing & Sanitization ───────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(compression())
app.use(hpp()) // Prevent HTTP Parameter Pollution

// ── HTTP Logging ──────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan('combined', {
      stream: { write: (msg) => logger.http(msg.trim()) },
    })
  )
}

// ── Static Files ──────────────────────────────────────────────
app.use('/uploads', express.static('uploads'))

// ── API Routes ────────────────────────────────────────────────
app.use('/api/v1', routes)

// ── Root Health Endpoint ──────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '⚡ EcoMargin Security Hardened API is running',
    version: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

// ── 404 Handler ───────────────────────────────────────────────
app.use(notFound)

// ── Global Error Handler ──────────────────────────────────────
app.use(errorHandler)

module.exports = app
