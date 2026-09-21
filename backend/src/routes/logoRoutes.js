// EcoMargin Backend — Logo Manager Routes
// src/routes/logoRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const logoController = require('../controllers/logoController')
const multer = require('multer')

// Configure memory storage multer for logo uploads (supports image/file field)
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Accept either 'file' or 'image' form fields
const uploadMiddleware = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
])

const { protect, restrictTo } = require('../middleware/auth')

// REST API Endpoints — GET is public, mutations require admin auth
router.get('/', logoController.getLogos)
router.post('/url', protect, restrictTo('superadmin', 'admin', 'sales_rep'), logoController.saveLogoUrl)
router.post('/upload', protect, restrictTo('superadmin', 'admin', 'sales_rep'), uploadMiddleware, (req, res, next) => {
  if (req.files) {
    if (req.files.file && req.files.file[0]) req.file = req.files.file[0]
    else if (req.files.image && req.files.image[0]) req.file = req.files.image[0]
  }
  next()
}, logoController.uploadLogo)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), logoController.updateLogo)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), logoController.deleteLogo)

module.exports = router
