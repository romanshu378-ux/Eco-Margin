// EcoMargin — Auth Routes
// src/routes/authRoutes.js
'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { protect } = require('../middleware/auth')
const authLimiter = require('../middleware/authLimiter')
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
} = require('../middleware/validators')

// POST /api/v1/auth/register
router.post('/register', authLimiter, validateRegister, authController.register)

// POST /api/v1/auth/login
router.post('/login', authLimiter, validateLogin, authController.login)

// POST /api/v1/auth/logout
router.post('/logout', protect, authController.logout)

// POST /api/v1/auth/refresh
router.post('/refresh', protect, authController.refreshToken)

// POST /api/v1/auth/forgot-password
router.post('/forgot-password', authLimiter, validateForgotPassword, authController.forgotPassword)

// POST /api/v1/auth/reset-password
router.post('/reset-password', authLimiter, validateResetPassword, authController.resetPassword)

// GET /api/v1/auth/verify-email/:token
router.get('/verify-email/:token', authController.verifyEmail)

// GET /api/v1/auth/me
router.get('/me', protect, authController.getMe)

module.exports = router
