'use strict';

const { Sequelize } = require('sequelize');
const logger = require('./logger');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbName) {
  throw new Error('DB_NAME environment variable is required');
}
if (!dbUser) {
  throw new Error('DB_USER environment variable is required');
}
if (!dbPassword) {
  throw new Error('DB_PASSWORD environment variable is required');
}

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
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