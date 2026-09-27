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

    // Production-Safe Model Sync (Syncs missing tables ONLY, never force, never alter)
    try {
      await sequelize.sync({ force: false, alter: false })
      logger.info('✅ Database synced successfully')
    } catch (syncErr) {
      logDbError(syncErr, 'Sequelize Model Sync Warning')
      logger.warn('⚠️ Proceeding with existing database schema...')
    }

    // Initialize CMS defaults ONLY if tables are completely empty (0 records)
    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }
  } catch (authErr) {
    logDbError(authErr, 'MySQL Connection Warning')
    logger.warn('⚠️ Database initialization delayed or offline; server remains healthy.')
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
