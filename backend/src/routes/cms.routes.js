// EcoMargin Backend — CMS Routes
// src/routes/cms.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const cmsController = require('../controllers/cmsController')

const seoController = require('../controllers/seoController')

router.get('/homepage', cmsController.getHomepageCMS)
router.put('/homepage', cmsController.updateHomepageCMS)

router.get('/about', cmsController.getAboutCMS)
router.put('/about', cmsController.updateAboutCMS)

router.get('/manufacturing', cmsController.getManufacturingCMS)
router.put('/manufacturing', cmsController.updateManufacturingCMS)

router.get('/footer', cmsController.getFooterCMS)
router.put('/footer', cmsController.updateFooterCMS)

router.get('/seo', cmsController.getSEOCMS)
router.put('/seo', cmsController.updateSEOCMS)
router.post('/seo/generate', seoController.generateAISEO)

router.get('/analytics', cmsController.getAnalytics)

module.exports = router
