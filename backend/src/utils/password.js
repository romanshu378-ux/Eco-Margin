// EcoMargin — Password Utility (bcryptjs)
// src/utils/password.js

'use strict'

const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

/**
 * Hashes a plain text password using bcryptjs with cost factor 12
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Password hash
 */
const hashPassword = async (password) => {
  if (!password) throw new Error('Password is required for hashing')
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

/**
 * Compares plain text password against hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} Match result
 */
const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) return false
  return bcrypt.compare(password, hashedPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
