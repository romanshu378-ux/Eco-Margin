// EcoMargin — JWT Auth Middleware
// src/middleware/auth.js
'use strict'

const jwt = require('jsonwebtoken')
const { AppError } = require('./errorHandler')

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required')
}

const protect = async (req, res, next) => {
  try {
    let token
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    }

    if (!token) {
      return next(new AppError('Authentication required. Please log in to access this resource.', 401))
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret)
    
    // Attach decoded user info to request
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401))
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Your session has expired. Please log in again.', 401))
    }
    next(error)
  }
}

const restrictTo = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission to perform this action.', 403))
  }
  next()
}

module.exports = { protect, restrictTo }
