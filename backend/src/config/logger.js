// EcoMargin — Winston Logger
// src/config/logger.js

'use strict'

const { createLogger, format, transports } = require('winston')
const path = require('path')

const { combine, timestamp, printf, colorize, errors } = format

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`
})

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat,
  ),
  transports: [
    // Console (dev only)
    new transports.Console({
      format: combine(colorize(), logFormat),
      silent: process.env.NODE_ENV === 'test',
    }),
    // File — combined
    new transports.File({
      filename: path.join('logs', 'combined.log'),
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
    // File — errors only
    new transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
})

module.exports = logger
