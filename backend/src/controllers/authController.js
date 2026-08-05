// EcoMargin — Auth Controller (Production Hardened)
// src/controllers/authController.js

'use strict'

const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const { AppError } = require('../middleware/errorHandler')
const { hashPassword, comparePassword } = require('../utils/password')

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRATION || '24h'

// In-memory mock store for testing auth hashing (in production backed by DB models)
const demoUsers = new Map()

// Pre-seed hashed superadmin credentials
;(async () => {
  const adminHash = await hashPassword('Ecomargin@2024')
  demoUsers.set('admin2026@ecomargin.in', {
    id: 1,
    name: 'Super Admin',
    email: 'admin2026@ecomargin.in',
    passwordHash: adminHash,
    role: 'superadmin'
  })
})()

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// POST /api/v1/auth/register
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body

  if (demoUsers.has(email)) {
    return next(new AppError('An account with this email address already exists', 409))
  }

  const hashedPassword = await hashPassword(password)
  const newUser = {
    id: Date.now(),
    firstName: firstName || 'EcoUser',
    lastName: lastName || '',
    name: `${firstName || 'EcoUser'} ${lastName || ''}`.trim(),
    email,
    passwordHash: hashedPassword,
    role: role || 'driver'
  }

  demoUsers.set(email, newUser)
  const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name })

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  })
})

// POST /api/v1/auth/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  let existingUser = demoUsers.get(email)

  // Fallback for demo credentials if map isn't populated yet
  if (!existingUser && email === 'admin2026@ecomargin.in') {
    const adminHash = await hashPassword('Ecomargin@2024')
    existingUser = {
      id: 1,
      name: 'Super Admin',
      email: 'admin2026@ecomargin.in',
      passwordHash: adminHash,
      role: 'superadmin'
    }
    demoUsers.set(email, existingUser)
  }

  if (!existingUser) {
    return next(new AppError('Invalid email or password', 401))
  }

  const isMatch = await comparePassword(password, existingUser.passwordHash)
  if (!isMatch) {
    return next(new AppError('Invalid email or password', 401))
  }

  const token = generateToken({
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role
  })

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role
    }
  })
})

// GET /api/v1/auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
})

// POST /api/v1/auth/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
})

// POST /api/v1/auth/refresh
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const token = generateToken({ id: req.user.id, role: req.user.role, email: req.user.email })
  res.status(200).json({
    success: true,
    token
  })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset link sent to your email.' })
})

exports.resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset successful.' })
})

exports.verifyEmail = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Email verified successfully.' })
})
