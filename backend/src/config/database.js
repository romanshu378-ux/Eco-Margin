'use strict';

const { Sequelize } = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecomargin_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'fnYNgvLwRvYcD3We',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 4000,
    dialect: 'mysql',

    // ===== TiDB Cloud SSL =====
    dialectOptions: process.env.DB_SSL === 'false' ? {} : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },

    logging:
      process.env.NODE_ENV === 'development'
        ? (sql) => logger.debug(sql)
        : false,

    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

module.exports = { sequelize };