// EcoMargin Backend — Category Routes
// src/routes/categoryRoutes.js

'use strict'

const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const { protect, restrictTo } = require('../middleware/auth')

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/', protect, restrictTo('superadmin', 'admin', 'sales_rep'), categoryController.createCategory)
router.put('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), categoryController.updateCategory)
router.delete('/:id', protect, restrictTo('superadmin', 'admin', 'sales_rep'), categoryController.deleteCategory)

module.exports = router
