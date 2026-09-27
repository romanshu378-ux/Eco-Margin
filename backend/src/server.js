// EcoMargin — Production-Safe Express Server Entry Point
// src/server.js

'use strict'

// ── Startup Logging (Render & Diagnostics) ───────────────────
console.log('Server starting...')
console.log('Database initialization...')

const http = require('http')
const app = require('./app')
const { sequelize } = require('./config/database')
const logger = require('./config/logger')
const { initCMSDefaults } = require('./utils/initCMS')

// Ensure models and associations are loaded
require('./models')

const PORT = process.env.PORT || 5000

// ── Create HTTP Server ────────────────────────────────────────
const server = http.createServer(app)

/**
 * Format and log comprehensive MySQL database errors
 */
const logDbError = (err, context = 'Database Error') => {
  logger.error(`❌ [${context}] ${err.message || err}`)
  logger.error(`   - Error Name : ${err.name || 'N/A'}`)

  const parent = err.parent || err.original
  if (parent) {
    logger.error(`   - SQL Message: ${parent.sqlMessage || parent.message || 'N/A'}`)
    logger.error(`   - Error Code : ${parent.code || 'N/A'}`)
    logger.error(`   - Errno      : ${parent.errno || 'N/A'}`)
    logger.error(`   - Failed SQL : ${parent.sql || 'N/A'}`)
  }
}

// ── 1. Start HTTP Express Server Immediately ──────────────────
// Binds to 0.0.0.0 so Render detects server readiness immediately
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`HTTP server listening on port ${PORT}`)
  console.log('Health endpoint available at /health')
  logger.info(`🚀 Server running on port ${PORT} bound to 0.0.0.0`)
})

// ── 2. Asynchronous Database Initialization (Non-blocking) ───
// Server handles /health immediately while DB connects in background
const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    logger.info('✅ MySQL Connected')

    // Model sync: In production, skip table alterations if tables exist
    try {
      if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({ force: false, alter: false })
        logger.info('✅ Database synced successfully')
      }
    } catch (syncErr) {
      logDbError(syncErr, 'Sequelize Model Sync Warning')
      logger.warn('⚠️ Proceeding with existing database schema...')
    }

    // Initialize CMS defaults safely (skips if data already exists)
    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }

    // Mark database as ready so API endpoints can serve requests
    app.setDatabaseReady(true)
    logger.info('🚀 Database initialization complete — Application APIs operational')
  } catch (authErr) {
    app.setDatabaseReady(false)
    logDbError(authErr, 'MySQL Connection Error')
    logger.warn('⚠️ Database connection offline or delayed; /health continues responding.')
  }
}

initDatabase()

// ── Graceful Shutdown ─────────────────────────────────────────
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`)
  server.close(async () => {
    try {
      await sequelize.close()
      logger.info('💤 Database connection terminated cleanly.')
    } catch (err) {
      logger.error('Error closing database connection:', err.message)
    }
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// ── Unhandled Error Handlers ──────────────────────────────────
process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error) {
    logDbError(reason, 'Unhandled Promise Rejection')
  } else {
    logger.error('Unhandled Promise Rejection:', reason)
  }
})

process.on('uncaughtException', (error) => {
  logDbError(error, 'Uncaught Exception')
  process.exit(1)
})
