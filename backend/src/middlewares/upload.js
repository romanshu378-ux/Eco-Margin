// EcoMargin — Multer Cloudinary Upload Middleware
// src/middlewares/upload.js

'use strict'

const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { cloudinary } = require('../config/cloudinary')
const { AppError } = require('../middleware/errorHandler')

// ── Cloudinary Storage Engine Configuration ───────────────────────
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecomargin/media',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
    transformation: [
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: (req, file) => {
      const nameWithoutExt = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_')
      return `${Date.now()}_${nameWithoutExt}`
    }
  }
})

// ── File Filter to enforce image formats ──────────────────────────
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new AppError('Only image files (JPEG, PNG, WEBP, GIF, SVG) are allowed!', 400), false)
  }
}

// ── Multer Instance ───────────────────────────────────────────────
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max file size
  }
})

module.exports = upload
