// EcoMargin — Server Entry Point
// server.js

'use strict'

require('dotenv').config()
const app = require('./src/app')
const { connectDB } = require('./src/config/db.config')

// Dynamic Port configuration for Render (never hardcode)
const PORT = process.env.PORT || 5000

// Initialize Database connection then start Express server
const startServer = async () => {
  try {
    // Attempt connection to TiDB Cloud / MySQL
    await connectDB()

    app.listen(PORT, () => {
      console.log(`
=====================================================
🚀 EcoMargin API Server Running
📡 Environment : ${process.env.NODE_ENV || 'development'}
🌐 Port        : ${PORT}
🗄️ Database    : ${process.env.DB_NAME || 'ecomargin_db'} (TiDB Cloud)
☁️ Storage     : Cloudinary Enabled
=====================================================
      `)
    })
  } catch (error) {
    console.error('❌ Failed to start server due to fatal connection error:', error.message)
    process.exit(1)
  }
}

startServer()
