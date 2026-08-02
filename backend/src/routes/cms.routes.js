// EcoMargin Backend — CMS Routes
// src/routes/cms.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const cmsController = require('../controllers/cmsController')

router.get('/homepage', cmsController.getHomepageCMS)
router.put('/homepage', cmsController.updateHomepageCMS)

router.get('/about', cmsController.getAboutCMS)
router.put('/about', cmsController.updateAboutCMS)

router.get('/footer', cmsController.getFooterCMS)
router.put('/footer', cmsController.updateFooterCMS)

router.get('/seo', cmsController.getSEOCMS)
router.put('/seo', cmsController.updateSEOCMS)

router.get('/analytics', cmsController.getAnalytics)

module.exports = router
