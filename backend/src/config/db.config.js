// EcoMargin — Database Configuration Bridge
// src/config/db.config.js
'use strict'

const { sequelize } = require('./database')

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate()
      console.log(`✅ [TiDB Cloud / MySQL] Database connected successfully at ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
      return true
    } catch (error) {
      retries -= 1
      console.error(`❌ [Database Connection Error]: ${error.message}`)
      if (retries === 0) {
        console.error('💥 All database reconnect attempts failed.')
        if (process.env.NODE_ENV === 'production') {
          process.exit(1)
        }
        return false
      }
      console.log(`🔄 Retrying database connection in ${delay / 1000}s... (${retries} attempts remaining)`)
      await new Promise((res) => setTimeout(res, delay))
    }
  }
}

module.exports = { sequelize, connectDB, db: sequelize }
