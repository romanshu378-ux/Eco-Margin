'use strict';

const { Sequelize } = require('sequelize');
const logger = require('./logger');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT, 10);
const dbConnectionLimit = parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10;

if (!dbName) {
  throw new Error('DB_NAME environment variable is required');
}
if (!dbUser) {
  throw new Error('DB_USER environment variable is required');
}
if (!dbPassword) {
  throw new Error('DB_PASSWORD environment variable is required');
}
if (!dbHost) {
  throw new Error('DB_HOST environment variable is required');
}
if (!dbPort || isNaN(dbPort)) {
  throw new Error('DB_PORT environment variable is required');
}

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',

    // ===== TiDB Cloud SSL & Connection Options =====
    dialectOptions: process.env.DB_SSL === 'false' ? {
      connectTimeout: 10000,
      enableKeepAlive: true,
    } : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectTimeout: 10000,
      enableKeepAlive: true,
    },

    pool: {
      max: Math.max(dbConnectionLimit, 10),
      min: 0,
      acquire: 10000,
      idle: 10000,
      evict: 1000,
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