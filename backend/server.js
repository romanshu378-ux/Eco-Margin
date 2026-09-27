// EcoMargin — Production-Safe Server Entry Point
// server.js

'use strict'

// ── Startup Logging (Render & Diagnostics) ───────────────────
console.log('Server starting...')
console.log('Database initialization...')

require('dotenv').config()
const app = require('./src/app')
const { sequelize, connectDB } = require('./src/config/db.config')
const { getAllowedOrigins } = require('./src/config/cors')
const { initCMSDefaults } = require('./src/utils/initCMS')

// Ensure models and associations are loaded
require('./src/models')

const PORT = process.env.PORT || 5000

/**
 * Format and log comprehensive MySQL database errors
 */
const logDbError = (err, context = 'Database Error') => {
  console.error(`❌ [${context}] ${err.message || err}`)
  console.error(`   - Error Name : ${err.name || 'N/A'}`)

  const parent = err.parent || err.original
  if (parent) {
    console.error(`   - SQL Message: ${parent.sqlMessage || parent.message || 'N/A'}`)
    console.error(`   - Error Code : ${parent.code || 'N/A'}`)
    console.error(`   - Errno      : ${parent.errno || 'N/A'}`)
    console.error(`   - Failed SQL : ${parent.sql || 'N/A'}`)
  }
}

// ── 1. Start HTTP Express Server Immediately ──────────────────
// Binds to 0.0.0.0 so Render detects server readiness immediately
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server listening on port ${PORT}`)
  console.log('Health endpoint available at /health')
  console.log(`
=====================================================
📡 Environment : ${process.env.NODE_ENV || 'production'}
🌐 Port        : ${PORT}
🗄️ Database    : ${process.env.DB_NAME || 'ecomargin_db'}
🔒 CORS Allowed Origins:
   ${getAllowedOrigins().join('\n   ')}
=====================================================
  `)
})

// ── 2. Asynchronous Database Initialization (Non-blocking) ───
const startDatabase = async () => {
  try {
    await connectDB(3, 2000)
    console.log('✅ MySQL Connected')

    try {
      await sequelize.sync({ force: false, alter: false })
      console.log('✅ Database synced successfully')
    } catch (syncErr) {
      logDbError(syncErr, 'Sequelize Model Sync Warning')
      console.warn('⚠️ Proceeding with existing database schema...')
    }

    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }
  } catch (error) {
    logDbError(error, 'Database Initialization Warning')
    console.warn('⚠️ Server running; database connection retry in background.')
  }
}

startDatabase()
