// EcoMargin — Admin Routes (Cloudinary & REST API Enhanced)
// src/routes/adminRoutes.js

'use strict'
const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')
const upload = require('../middlewares/upload')
const { deleteImage, optimizeImageUrl } = require('../config/cloudinary')
const { successResponse, paginateResponse } = require('../utils/apiResponse')

// Protect all admin routes
router.use(protect)
router.use(restrictTo('superadmin', 'admin'))

// ── Metrics & Dashboard ─────────────────────────────────────────────
router.get('/dashboard', (req, res) => {
  return successResponse(res, 'Admin dashboard metrics retrieved successfully', {
    totalRevenue: 45231,
    activeDrivers: 2350,
    activeChargers: 1204,
    energyDelivered: '45 MWh'
  })
})

// ── Media & Cloudinary Upload Endpoints ─────────────────────────────
router.post('/media/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided for upload' })
  }

  const fileData = {
    url: req.file.path,
    public_id: req.file.filename,
    optimized_url: optimizeImageUrl(req.file.filename),
    format: req.file.mimetype,
    size: req.file.size
  }

  return successResponse(res, 'Image uploaded successfully to Cloudinary', fileData, 201)
})

router.delete('/media/:public_id', async (req, res, next) => {
  try {
    const publicId = req.params.public_id
    await deleteImage(publicId)
    return successResponse(res, `Image ${publicId} deleted from Cloudinary successfully`)
  } catch (error) {
    next(error)
  }
})

// ── Resource Routes (Paginated API format) ──────────────────────────
router.get('/users', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/stations', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/products', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/categories', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/blogs', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/gallery', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/projects', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/contact', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/newsletter', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
const downloadsRoutes = require('./downloadsRoutes')

router.use('/downloads', downloadsRoutes)

module.exports = router
