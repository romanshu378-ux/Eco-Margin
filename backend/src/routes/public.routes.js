// EcoMargin Backend — Public API Routes
// src/routes/public.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const publicController = require('../controllers/publicController')

// Public Unauthenticated CMS GET Endpoints
router.get('/homepage', publicController.getPublicHomepage)
router.get('/about', publicController.getPublicAbout)
router.get('/footer', publicController.getPublicFooter)
router.get('/contact', publicController.getPublicContact)
router.get('/seo', publicController.getPublicSEO)

// Catalog & Portfolio Endpoints
router.get('/products', publicController.getPublicProducts)
router.get('/services', publicController.getPublicServices)
router.get('/downloads', publicController.getPublicDownloads)

// RFQ Lead Submission
router.post('/rfq', publicController.submitRFQEnquiry)

module.exports = router
