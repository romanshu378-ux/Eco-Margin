// EcoMargin Backend — Public API Routes
// src/routes/public.routes.js

'use strict'

const express = require('express')
const router = express.Router()
const publicController = require('../controllers/publicController')
const dealerController = require('../controllers/dealerController')
const newsletterController = require('../controllers/newsletterController')
const logoController = require('../controllers/logoController')

const seoController = require('../controllers/seoController')

// Public Unauthenticated CMS GET Endpoints
router.get('/homepage', publicController.getPublicHomepage)
router.get('/about', publicController.getPublicAbout)
router.get('/manufacturing', publicController.getPublicManufacturing)
router.get('/footer', publicController.getPublicFooter)
router.get('/contact', publicController.getPublicContact)
router.get('/seo', seoController.getSEOByRoute)
router.get('/sitemap.xml', seoController.generateSitemap)
router.get('/robots.txt', seoController.generateRobotsTxt)
router.get('/logo', logoController.getLogos)

// Catalog & Portfolio Endpoints
router.get('/categories', publicController.getPublicCategories)
router.get('/industries', publicController.getPublicIndustries)
router.get('/projects', publicController.getPublicProjects)
router.get('/gallery', publicController.getPublicGallery)
router.get('/blogs', publicController.getPublicBlogs)
router.get('/blogs/:slug', publicController.getPublicBlogBySlug)
router.get('/products', publicController.getPublicProducts)
router.get('/services', publicController.getPublicServices)
router.get('/downloads', publicController.getPublicDownloads)

// Form Submissions
router.post('/rfq', publicController.submitRFQEnquiry)
router.post('/dealer-apply', dealerController.createDealer)
router.post('/newsletter', newsletterController.subscribeNewsletter)

module.exports = router
