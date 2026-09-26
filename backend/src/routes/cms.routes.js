// EcoMargin Backend — CMS Routes
// src/routes/cms.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const cmsController = require('../controllers/cmsController')

const seoController = require('../controllers/seoController')

const { protect, restrictTo } = require('../middleware/auth')

router.get('/homepage', cmsController.getHomepageCMS)
router.put('/homepage', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateHomepageCMS)

router.get('/about', cmsController.getAboutCMS)
router.put('/about', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateAboutCMS)

router.get('/manufacturing', cmsController.getManufacturingCMS)
router.put('/manufacturing', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateManufacturingCMS)

router.get('/footer', cmsController.getFooterCMS)
router.put('/footer', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateFooterCMS)
router.get('/contact', cmsController.getFooterCMS)
router.put('/contact', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateFooterCMS)

router.get('/seo', cmsController.getSEOCMS)
router.put('/seo', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.updateSEOCMS)
router.post('/seo/generate', protect, restrictTo('superadmin', 'admin', 'sales_rep'), seoController.generateAISEO)

router.get('/analytics', protect, restrictTo('superadmin', 'admin', 'sales_rep'), cmsController.getAnalytics)

module.exports = router
