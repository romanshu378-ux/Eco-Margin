// EcoMargin — Input Validation Rules
// src/middleware/validators.js

'use strict'

const { body } = require('express-validator')
const validate = require('./validate')

// ── Registration Validation Chain ────────────────────────────────
const validateRegister = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
  body('firstName')
    .optional()
    .trim()
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .escape(),
  validate
]

// ── Login Validation Chain ───────────────────────────────────────
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
]

// ── Password Reset Validation Chain ──────────────────────────────
const validateForgotPassword = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  validate
]

const validateResetPassword = [
  body('token')
    .notEmpty().withMessage('Reset token is required'),
  body('password')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  validate
]

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword
}
