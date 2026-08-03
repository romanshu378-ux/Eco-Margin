// EcoMargin — Admin Routes (Cloudinary & REST API Enhanced)
// src/routes/adminRoutes.js

'use strict'
const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')
const upload = require('../middlewares/upload')
const { deleteImage, optimizeImageUrl } = require('../config/cloudinary')
const { successResponse, paginateResponse } = require('../utils/apiResponse')

const downloadsRoutes = require('./downloadsRoutes')
const categoryRoutes = require('./categoryRoutes')
const industryRoutes = require('./industryRoutes')
const projectRoutes = require('./projectRoutes')
const galleryRoutes = require('./galleryRoutes')
const blogRoutes = require('./blogRoutes')
const leadRoutes = require('./leadRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const dealerRoutes = require('./dealerRoutes')
const newsletterRoutes = require('./newsletterRoutes')

// Protect all admin routes
router.use(protect)
router.use(restrictTo('superadmin', 'admin', 'sales_rep'))

// ── Dashboard Analytics & Real-Time Stats ───────────────────────────
router.use('/dashboard', dashboardRoutes)

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

// ── Domain Admin CMS & Enquiries Routes ──────────────────────────────
router.use('/downloads', downloadsRoutes)
router.use('/categories', categoryRoutes)
router.use('/industries', industryRoutes)
router.use('/projects', projectRoutes)
router.use('/gallery', galleryRoutes)
router.use('/blogs', blogRoutes)
router.use('/leads', leadRoutes)
router.use('/contact', leadRoutes)
router.use('/dealer-applications', dealerRoutes)
router.use('/newsletter', newsletterRoutes)
router.use('/newsletters', newsletterRoutes)

// ── Resource Endpoints ───────────────────────────────────────────────
router.get('/users', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/stations', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))
router.get('/products', (req, res) => paginateResponse(res, [], req.query.page, req.query.limit, 0, req.query))

module.exports = router
