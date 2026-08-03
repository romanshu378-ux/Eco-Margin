// EcoMargin — Production-Safe Express Server Entry Point
// src/server.js

'use strict'

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

// ── Database + Server Bootstrap ───────────────────────────────
const bootstrap = async () => {
  try {
    // 1. Authenticate Database Connection
    try {
      await sequelize.authenticate()
      logger.info('✅ MySQL Connected')
    } catch (authErr) {
      logDbError(authErr, 'MySQL Authentication Failed')
      process.exit(1)
    }

    // 2. Production-Safe Model Sync (Syncs missing tables ONLY, never force, never alter)
    try {
      await sequelize.sync({ force: false, alter: false })
      logger.info('✅ Database synced successfully')
    } catch (syncErr) {
      logDbError(syncErr, 'Sequelize Model Sync Warning')
      logger.warn('⚠️ Proceeding with existing database schema...')
    }

    // 3. Initialize CMS defaults ONLY if tables are completely empty (0 records)
    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }

    // 4. Start HTTP Express Server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`)
      logger.info(`📍 Health check endpoint: http://localhost:${PORT}/api/v1/health`)
    })
  } catch (error) {
    logDbError(error, 'Fatal Server Bootstrap Crash')
    process.exit(1)
  }
}

bootstrap()

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
