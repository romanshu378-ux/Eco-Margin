// EcoMargin Backend — Downloads & Certificates Controller
// src/controllers/downloadsController.js

'use strict'

const { Download, ActivityLog } = require('../models')
const { sequelize } = require('../config/database')

// Helper for cache headers
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// Safely ensure downloads table has all required columns
async function autoMigrateDownloadsSchema() {
  try {
    await sequelize.query("ALTER TABLE downloads ADD COLUMN description TEXT NULL;").catch(() => {})
    await sequelize.query("ALTER TABLE downloads ADD COLUMN icon_url VARCHAR(500) NULL;").catch(() => {})
    await sequelize.query("ALTER TABLE downloads ADD COLUMN file_size VARCHAR(50) DEFAULT '1.5 MB';").catch(() => {})
    await sequelize.query("ALTER TABLE downloads ADD COLUMN display_order INT DEFAULT 0;").catch(() => {})
    await sequelize.query("ALTER TABLE downloads ADD COLUMN status ENUM('Active', 'Draft', 'Inactive') DEFAULT 'Active';").catch(() => {})
  } catch (err) {
    // Ignore duplicate column errors
  }
}

// GET /api/v1/admin/downloads or /api/downloads (Fetch all documents for admin)
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
    if (error.message && (error.message.includes('Unknown column') || error.message.includes('ER_BAD_FIELD_ERROR'))) {
      console.warn('⚠️ [Downloads Schema Warning] Missing columns detected. Executing auto-migration...')
      try {
        await autoMigrateDownloadsSchema()
        const retriedDownloads = await Download.findAll({
          order: [['displayOrder', 'ASC'], ['id', 'DESC']]
        })
        return res.status(200).json({
          success: true,
          message: 'Downloads retrieved successfully after schema sync',
          data: retriedDownloads
        })
      } catch (retryError) {
        console.error('❌ [Auto Migration Failed]:', retryError)
      }
    }
    console.error('❌ [Downloads Fetch Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch downloads'
    })
  }
}

// GET /api/v1/public/downloads (Fetch active documents for public website)
exports.getPublicDownloads = async (req, res) => {
  setNoCache(res)
  try {
    const downloads = await Download.findAll({
      where: { status: 'Active' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({
      success: true,
      message: 'Active public downloads retrieved successfully',
      data: downloads
    })
  } catch (error) {
    if (error.message && (error.message.includes('Unknown column') || error.message.includes('ER_BAD_FIELD_ERROR'))) {
      console.warn('⚠️ [Public Downloads Schema Warning] Missing columns detected. Executing auto-migration...')
      try {
        await autoMigrateDownloadsSchema()
        const retriedDownloads = await Download.findAll({
          where: { status: 'Active' },
          order: [['displayOrder', 'ASC'], ['id', 'DESC']]
        })
        return res.status(200).json({
          success: true,
          message: 'Active public downloads retrieved successfully after schema sync',
          data: retriedDownloads
        })
      } catch (retryError) {
        console.error('❌ [Auto Migration Failed]:', retryError)
      }
    }
    console.error('❌ [Public Downloads Fetch Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch public downloads'
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
  const { name, title, category, description, fileSize, fileUrl, pdfUrl, iconUrl, displayOrder, status } = req.body

  const docTitle = (title || name || '').trim()
  const docFileUrl = (pdfUrl || fileUrl || '').trim()

  if (!docTitle) {
    return res.status(400).json({
      success: false,
      message: 'Document Title / Name is required.'
    })
  }
  if (!docFileUrl) {
    return res.status(400).json({
      success: false,
      message: 'PDF File URL is required.'
    })
  }

  try {
    await autoMigrateDownloadsSchema()

    const newDownload = await Download.create({
      name: docTitle,
      category: category ? category.trim() : 'Technical Datasheet',
      description: description ? description.trim() : '',
      fileSize: fileSize ? fileSize.trim() : '1.5 MB',
      fileUrl: docFileUrl,
      iconUrl: iconUrl ? iconUrl.trim() : null,
      displayOrder: parseInt(displayOrder, 10) || 0,
      status: status || 'Active'
    })

    ActivityLog.log({
      action: 'Download Document Created',
      type: 'CMS',
      description: `Created document "${docTitle}" (${newDownload.category})`,
      ipAddress: req.ip
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
  const { name, title, category, description, fileSize, fileUrl, pdfUrl, iconUrl, displayOrder, status } = req.body

  try {
    await autoMigrateDownloadsSchema()

    const download = await Download.findByPk(id)
    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download document record not found'
      })
    }

    const docTitle = title || name
    const docFileUrl = pdfUrl || fileUrl

    if (docTitle !== undefined) download.name = docTitle.trim()
    if (category !== undefined) download.category = category.trim()
    if (description !== undefined) download.description = description.trim()
    if (fileSize !== undefined) download.fileSize = fileSize.trim()
    if (docFileUrl !== undefined) download.fileUrl = docFileUrl.trim()
    if (iconUrl !== undefined) download.iconUrl = iconUrl ? iconUrl.trim() : null
    if (displayOrder !== undefined) download.displayOrder = parseInt(displayOrder, 10) || 0
    if (status !== undefined) download.status = status

    await download.save()

    ActivityLog.log({
      action: 'Download Document Updated',
      type: 'CMS',
      description: `Updated document "${download.name}" (ID ${id})`,
      ipAddress: req.ip
    })

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

    const docTitle = download.name
    await download.destroy()

    ActivityLog.log({
      action: 'Download Document Deleted',
      type: 'CMS',
      description: `Deleted document "${docTitle}" (ID ${id})`,
      ipAddress: req.ip
    })

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
