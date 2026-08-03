// EcoMargin Backend — Downloads & Certificates Controller
// src/controllers/downloadsController.js

'use strict'

const { Download } = require('../models')

// Helper for cache headers
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// GET /api/v1/admin/downloads (Fetch all documents for admin)
exports.getAllDownloads = async (req, res) => {
  setNoCache(res)
  try {
    const downloads = await Download.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Downloads retrieved successfully',
      data: downloads
    })
  } catch (error) {
    console.error('❌ [Downloads Fetch Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch downloads'
    })
  }
}

// GET /api/v1/admin/downloads/:id
exports.getDownloadById = async (req, res) => {
  setNoCache(res)
  try {
    const download = await Download.findByPk(req.params.id)
    if (!download) {
      return res.status(404).json({ success: false, message: 'Document not found' })
    }
    return res.status(200).json({
      success: true,
      data: download
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/v1/admin/downloads (Create new document)
exports.createDownload = async (req, res) => {
  setNoCache(res)
  const { name, category, fileSize, fileUrl, displayOrder, status } = req.body

  if (!name || !fileUrl) {
    return res.status(400).json({
      success: false,
      message: 'Document Name and PDF File URL are required.'
    })
  }

  try {
    const newDownload = await Download.create({
      name,
      category: category || 'Technical Datasheet',
      fileSize: fileSize || '1.0 MB',
      fileUrl,
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Active'
    })

    console.log('✅ [Database Commit] Created download record ID:', newDownload.id)
    return res.status(201).json({
      success: true,
      message: 'Document added successfully',
      data: newDownload
    })
  } catch (error) {
    console.error('❌ [Create Download Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create document record'
    })
  }
}

// PUT /api/v1/admin/downloads/:id (Update existing document)
exports.updateDownload = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { name, category, fileSize, fileUrl, displayOrder, status } = req.body

  try {
    const download = await Download.findByPk(id)
    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download document record not found'
      })
    }

    if (name !== undefined) download.name = name
    if (category !== undefined) download.category = category
    if (fileSize !== undefined) download.fileSize = fileSize
    if (fileUrl !== undefined) download.fileUrl = fileUrl
    if (displayOrder !== undefined) download.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) download.status = status

    await download.save()

    console.log('✅ [Database Commit] Updated download record ID:', id)
    return res.status(200).json({
      success: true,
      message: 'Document updated successfully',
      data: download
    })
  } catch (error) {
    console.error('❌ [Update Download Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update document record'
    })
  }
}

// DELETE /api/v1/admin/downloads/:id (Delete document)
exports.deleteDownload = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const download = await Download.findByPk(id)
    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download document record not found'
      })
    }

    await download.destroy()
    console.log('🗑️ [Database Delete] Removed download record ID:', id)
    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully'
    })
  } catch (error) {
    console.error('❌ [Delete Download Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete document'
    })
  }
}
