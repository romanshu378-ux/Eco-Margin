// EcoMargin — Sequelize + MySQL Database Config
// src/config/database.js

'use strict'

const { Sequelize } = require('sequelize')
const logger = require('./logger')

const sequelize = new Sequelize(
  process.env.DB_NAME     || 'ecomargin_db',
  process.env.DB_USER     || 'root',
  process.env.DB_PASSWORD || '',
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    pool: {
      max:     parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
      min:     2,
      acquire: 30000,
      idle:    10000,
    },
    logging: (sql) => {
      if (process.env.NODE_ENV === 'development') {
        logger.debug(sql)
      }
    },
    define: {
      timestamps:  true,
      underscored: true,
    },
  },
)

module.exports = { sequelize }
