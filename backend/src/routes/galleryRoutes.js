// EcoMargin Backend — Gallery Routes
// src/routes/galleryRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', galleryController.getAllGallery)
router.get('/:id', galleryController.getGalleryById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), galleryController.createGallery)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), galleryController.updateGallery)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), galleryController.deleteGallery)

module.exports = router
