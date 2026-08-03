// EcoMargin Backend — Gallery Controller
// src/controllers/galleryController.js

'use strict'

const { Gallery } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

exports.getAllGallery = async (req, res) => {
  setNoCache(res)
  try {
    const gallery = await Gallery.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Gallery retrieved successfully',
      data: gallery
    })
  } catch (error) {
    console.error('❌ [Gallery Fetch Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch gallery' })
  }
}

exports.getGalleryById = async (req, res) => {
  setNoCache(res)
  try {
    const item = await Gallery.findByPk(req.params.id)
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' })
    return res.status(200).json({ success: true, data: item })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.createGallery = async (req, res) => {
  setNoCache(res)
  const { title, category, imageUrl, displayOrder, status } = req.body

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: 'Image URL is required.' })
  }

  try {
    const newItem = await Gallery.create({
      title: title || 'Factory Installation',
      category: category || 'Factory & Manufacturing',
      imageUrl,
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Active'
    })
    console.log('✅ [Database Commit] Created gallery item ID:', newItem.id)
    return res.status(201).json({ success: true, message: 'Gallery item created successfully', data: newItem })
  } catch (error) {
    console.error('❌ [Create Gallery Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to create gallery item' })
  }
}

exports.updateGallery = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { title, category, imageUrl, displayOrder, status } = req.body

  try {
    const item = await Gallery.findByPk(id)
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' })

    if (title !== undefined) item.title = title
    if (category !== undefined) item.category = category
    if (imageUrl !== undefined) item.imageUrl = imageUrl
    if (displayOrder !== undefined) item.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) item.status = status

    await item.save()
    console.log('✅ [Database Commit] Updated gallery item ID:', id)
    return res.status(200).json({ success: true, message: 'Gallery item updated successfully', data: item })
  } catch (error) {
    console.error('❌ [Update Gallery Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to update gallery item' })
  }
}

exports.deleteGallery = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const item = await Gallery.findByPk(id)
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' })
    await item.destroy()
    console.log('🗑️ [Database Delete] Removed gallery item ID:', id)
    return res.status(200).json({ success: true, message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('❌ [Delete Gallery Error]:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete gallery item' })
  }
}
