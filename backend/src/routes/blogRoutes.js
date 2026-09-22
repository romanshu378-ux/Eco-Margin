// EcoMargin Backend — Blog Routes
// src/routes/blogRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', blogController.getAllBlogs)
router.get('/slug/:slug', blogController.getBlogBySlug)
router.get('/:id', blogController.getBlogById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), blogController.createBlog)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), blogController.updateBlog)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), blogController.deleteBlog)

module.exports = router
