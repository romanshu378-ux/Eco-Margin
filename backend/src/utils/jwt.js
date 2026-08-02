// EcoMargin — JWT Utility
// src/utils/jwt.js
'use strict'

const jwt = require('jsonwebtoken')

const signToken = (payload, secret = process.env.JWT_SECRET, expiresIn = process.env.JWT_EXPIRES_IN || '7d') =>
  jwt.sign(payload, secret, { expiresIn })

const verifyToken = (token, secret = process.env.JWT_SECRET) =>
  jwt.verify(token, secret)

const signAccessToken  = (payload) => signToken(payload, process.env.JWT_SECRET,         process.env.JWT_EXPIRES_IN)
const signRefreshToken = (payload) => signToken(payload, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN)

module.exports = { signToken, verifyToken, signAccessToken, signRefreshToken }
