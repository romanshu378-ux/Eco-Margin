// EcoMargin — JWT Utility
// src/utils/jwt.js
'use strict'

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required')
}
if (!jwtRefreshSecret) {
  throw new Error('JWT_REFRESH_SECRET environment variable is required')
}

const signToken = (payload, secret = jwtSecret, expiresIn = process.env.JWT_EXPIRES_IN || '7d') =>
  jwt.sign(payload, secret, { expiresIn })

const verifyToken = (token, secret = jwtSecret) =>
  jwt.verify(token, secret)

const signAccessToken  = (payload) => signToken(payload, jwtSecret,         process.env.JWT_EXPIRES_IN)
const signRefreshToken = (payload) => signToken(payload, jwtRefreshSecret, process.env.JWT_REFRESH_EXPIRES_IN)

module.exports = { signToken, verifyToken, signAccessToken, signRefreshToken }
