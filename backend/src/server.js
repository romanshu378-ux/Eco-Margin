// EcoMargin — Express Server Entry Point
// src/server.js

'use strict'

const http    = require('http')
const app     = require('./app')
const { sequelize } = require('./config/database')
const logger  = require('./config/logger')
const { initCMSDefaults } = require('./utils/initCMS')

const PORT = process.env.PORT || 5000

// ── Create HTTP Server ────────────────────────────────────────
const server = http.createServer(app)

// ── Database + Server Bootstrap ───────────────────────────────
const bootstrap = async () => {
  try {
    // Test DB Connection
    await sequelize.authenticate()
    logger.info('✅ MySQL connected successfully.')

    // Sync models safely (alter: true, never force)
    await sequelize.sync({ alter: true })
    logger.info('✅ Sequelize models synced with alter: true.')

    // Initialize CMS defaults ONLY if tables are completely empty (0 records)
    await initCMSDefaults()

    server.listen(PORT, () => {
      logger.info(`🚀 EcoMargin API running on port ${PORT} [${process.env.NODE_ENV}]`)
      logger.info(`📍 Health check: http://localhost:${PORT}/api/v1/health`)
    })
  } catch (error) {
    logger.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

bootstrap()

// ── Graceful Shutdown ─────────────────────────────────────────
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`)
  server.close(async () => {
    await sequelize.close()
    logger.info('💤 Server closed. Database connection terminated.')
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT',  () => gracefulShutdown('SIGINT'))

// ── Unhandled Errors ──────────────────────────────────────────
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection:', reason)
})

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error)
  process.exit(1)
})
