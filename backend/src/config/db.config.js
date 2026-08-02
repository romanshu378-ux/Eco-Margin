// EcoMargin — Database Configuration (TiDB Cloud / MySQL Compatible)
// src/config/db.config.js

'use strict'

const { Sequelize } = require('sequelize')
require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'
const dbPort = parseInt(process.env.DB_PORT, 10) || 4000

// ── Dialect & SSL Options for TiDB Cloud / MySQL ─────────────────
const dialectOptions = {
  connectTimeout: 60000,
}

// Enable SSL for TiDB Cloud in production or when DB_SSL is explicitly true
if (isProduction || process.env.DB_SSL === 'true' || dbPort === 4000) {
  dialectOptions.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
  }
}

// ── Sequelize Instance Setup ──────────────────────────────────────
const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecomargin_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: dbPort,
    dialect: 'mysql',
    dialectOptions,
    logging: process.env.NODE_ENV === 'development' ? (msg) => console.log(`[TiDB SQL] ${msg}`) : false,
    
    // ── Optimized Connection Pool ───────────────────────────────
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
      min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
      evict: 1000,
    },
    
    retry: {
      max: 3, // Auto reconnect retry count
    },
    
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  }
)

// ── Automatic Database Connection Test & Reconnect Handler ───────
const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate()
      console.log(`✅ [TiDB Cloud] Database connected successfully at ${process.env.DB_HOST || 'localhost'}:${dbPort}/${process.env.DB_NAME || 'ecomargin_db'}`)
      return true
    } catch (error) {
      retries -= 1
      console.error(`❌ [TiDB Cloud Connection Error]: ${error.message}`)
      if (retries === 0) {
        console.error('💥 All database reconnect attempts failed.')
        if (isProduction) {
          process.exit(1)
        }
        return false
      }
      console.log(`🔄 Retrying database connection in ${delay / 1000}s... (${retries} attempts remaining)`)
      await new Promise((res) => setTimeout(res, delay))
    }
  }
}

module.exports = { sequelize, connectDB }
