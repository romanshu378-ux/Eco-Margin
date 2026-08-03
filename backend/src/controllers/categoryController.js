// EcoMargin Backend — Product Categories Controller
// src/controllers/categoryController.js

'use strict'

const { Category } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

exports.getAllCategories = async (req, res) => {
  setNoCache(res)
  try {
    const categories = await Category.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories
    })
  } catch (error) {
    console.error('❌ [Categories Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch categories' })
  }
}

exports.getCategoryById = async (req, res) => {
  setNoCache(res)
  try {
    const category = await Category.findByPk(req.params.id)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    return res.status(200).json({ success: true, data: category })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.createCategory = async (req, res) => {
  setNoCache(res)
  const { name, slug, description, displayOrder, status } = req.body

  if (!name) {
    return res.status(400).json({ success: false, message: 'Category name is required.' })
  }

  const generatedSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  try {
    const newCategory = await Category.create({
      name,
      slug: generatedSlug,
      description: description || '',
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Active'
    })
    console.log('✅ [Database Commit] Created category ID:', newCategory.id)
    return res.status(201).json({ success: true, message: 'Category created successfully', data: newCategory })
  } catch (error) {
    console.error('❌ [Create Category Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create category' })
  }
}

exports.updateCategory = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { name, slug, description, displayOrder, status } = req.body

  try {
    const category = await Category.findByPk(id)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })

    if (name !== undefined) category.name = name
    if (slug !== undefined) category.slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (description !== undefined) category.description = description
    if (displayOrder !== undefined) category.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) category.status = status

    await category.save()
    console.log('✅ [Database Commit] Updated category ID:', id)
    return res.status(200).json({ success: true, message: 'Category updated successfully', data: category })
  } catch (error) {
    console.error('❌ [Update Category Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update category' })
  }
}

exports.deleteCategory = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const category = await Category.findByPk(id)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    await category.destroy()
    console.log('🗑️ [Database Delete] Removed category ID:', id)
    return res.status(200).json({ success: true, message: 'Category deleted successfully' })
  } catch (error) {
    console.error('❌ [Delete Category Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete category' })
  }
}
