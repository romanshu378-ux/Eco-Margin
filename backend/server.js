// EcoMargin — Production-Safe Server Entry Point
// server.js

require('dotenv').config()
const app = require('./src/app')
const { sequelize, connectDB } = require('./src/config/db.config')
const { initCMSDefaults } = require('./src/utils/initCMS')

// Ensure models and associations are loaded
require('./src/models')

const PORT = Number(process.env.PORT) || 5000

/**
 * Format and log comprehensive MySQL database errors
 */
const logDbError = (err, context = 'Database Error') => {
  console.error(`❌ [${context}] ${err.message || err}`)
  const parent = err.parent || err.original
  if (parent) {
    console.error(`   - SQL Message: ${parent.sqlMessage || parent.message || 'N/A'}`)
    console.error(`   - Error Code : ${parent.code || 'N/A'}`)
    console.error(`   - Errno      : ${parent.errno || 'N/A'}`)
  }
}

// ── 1. Start HTTP Express Server Immediately ──────────────────
// Binds to 0.0.0.0 so Render detects server readiness immediately
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`HTTP server listening on port ${PORT}`)
  console.log('Health endpoint available at /health')
})

// ── 2. Asynchronous Database Initialization (Non-blocking) ───
const startDatabase = async () => {
  try {
    await connectDB(3, 2000)
    console.log('MySQL connected')

    if (process.env.NODE_ENV !== 'production') {
      try {
        await sequelize.sync({ force: false, alter: false })
      } catch (syncErr) {
        logDbError(syncErr, 'Sequelize Model Sync Warning')
      }
    }

    console.log('Database initialization completed')

    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }
    console.log('CMS initialization completed')

    app.setDatabaseReady(true)
  } catch (error) {
    app.setDatabaseReady(false)
    logDbError(error, 'Database Initialization Warning')
    console.warn('⚠️ Server running; database connection retry in background.')
  }
}

startDatabase()
