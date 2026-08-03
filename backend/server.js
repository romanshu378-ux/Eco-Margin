// EcoMargin — Server Entry Point
// server.js

'use strict'

require('dotenv').config()
const app = require('./src/app')
const { sequelize, connectDB } = require('./src/config/db.config')
const { allowedOrigins } = require('./src/config/cors')
const { initCMSDefaults } = require('./src/utils/initCMS')

// Dynamic Port configuration for Render (never hardcode)
const PORT = process.env.PORT || 5000

// Initialize Database connection then start Express server
const startServer = async () => {
  try {
    // Attempt connection to TiDB Cloud / MySQL
    await connectDB()

    // Sync models safely (alter: true, never force)
    await sequelize.sync({ alter: true })
    console.log('✅ [Sequelize] Models synced with alter: true')

    // Initialize CMS defaults ONLY if tables are completely empty
    await initCMSDefaults()

    app.listen(PORT, () => {
      console.log(`
=====================================================
🚀 EcoMargin API Server Running
📡 Environment : ${process.env.NODE_ENV || 'development'}
🌐 Port        : ${PORT}
🗄️ Database    : ${process.env.DB_NAME || 'ecomargin_db'} (TiDB Cloud)
🔒 CORS Allowed Origins:
   ${allowedOrigins.join('\n   ')}
=====================================================
      `)
    })
  } catch (error) {
    console.error('❌ Failed to start server due to fatal connection error:', error.message)
    process.exit(1)
  }
}

startServer()
