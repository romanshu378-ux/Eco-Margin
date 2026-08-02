// EcoMargin Backend — Public API Routes
// src/routes/public.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const publicController = require('../controllers/publicController')

router.get('/products', publicController.getPublicProducts)
router.get('/services', publicController.getPublicServices)
router.get('/downloads', publicController.getPublicDownloads)
router.post('/rfq', publicController.submitRFQEnquiry)

module.exports = router
