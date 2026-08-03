// EcoMargin — Production-Safe Server Entry Point
// server.js

'use strict'

require('dotenv').config()
const app = require('./src/app')
const { sequelize, connectDB } = require('./src/config/db.config')
const { allowedOrigins } = require('./src/config/cors')
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

// Initialize Database connection then start Express server
const startServer = async () => {
  try {
    // 1. Attempt connection to MySQL / TiDB
    try {
      await connectDB()
      console.log('✅ MySQL Connected')
    } catch (connErr) {
      logDbError(connErr, 'MySQL Connection Failed')
      process.exit(1)
    }

    // 2. Production-Safe Model Sync (Syncs missing tables ONLY, never force, never alter)
    try {
      await sequelize.sync({ force: false, alter: false })
      console.log('✅ Database synced successfully')
    } catch (syncErr) {
      logDbError(syncErr, 'Sequelize Model Sync Warning')
      console.warn('⚠️ Proceeding with existing database schema...')
    }

    // 3. Initialize CMS defaults ONLY if tables are completely empty
    try {
      await initCMSDefaults()
    } catch (cmsErr) {
      logDbError(cmsErr, 'CMS Defaults Initializer Warning')
    }

    // 4. Listen on PORT
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`
=====================================================
📡 Environment : ${process.env.NODE_ENV || 'production'}
🌐 Port        : ${PORT}
🗄️ Database    : ${process.env.DB_NAME || 'ecomargin_db'}
🔒 CORS Allowed Origins:
   ${allowedOrigins.join('\n   ')}
=====================================================
      `)
    })
  } catch (error) {
    logDbError(error, 'Fatal Server Start Error')
    process.exit(1)
  }
}

startServer()
