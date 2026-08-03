// EcoMargin Backend — Logo Manager CMS Controller
// src/controllers/logoController.js

'use strict'

const { Logo, ActivityLog } = require('../models')
const cloudinary = require('../config/cloudinary')
const { sequelize } = require('../config/database')

// Helper for cache headers
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// Ensure website_logo table exists safely
async function autoMigrateLogosSchema() {
  try {
    await Logo.sync({ alter: false })
  } catch (err) {
    // Table already exists or initialized
  }
}

// GET /api/logo or /api/v1/public/logo or /api/v1/admin/logo
exports.getLogos = async (req, res) => {
  setNoCache(res)
  try {
    await autoMigrateLogosSchema()
    const logos = await Logo.findAll({
      order: [['id', 'ASC']]
    })

    // Transform array into convenient logoType map object
    const logoMap = {
      header: null,
      footer: null,
      favicon: null,
      white_logo: null
    }

    logos.forEach(item => {
      if (item.logoType) {
        logoMap[item.logoType] = item
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Logos retrieved successfully',
      data: logos,
      map: logoMap
    })
  } catch (error) {
    console.error('❌ [Logos Fetch Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch website logos'
    })
  }
}

// POST /api/logo/upload or /api/v1/admin/logo/upload
exports.uploadLogo = async (req, res) => {
  setNoCache(res)
  try {
    await autoMigrateLogosSchema()

    const { logoType, logo_type, imageUrl, image_url, publicId, public_id, altText, alt_text } = req.body

    const targetType = logoType || logo_type
    let targetUrl = imageUrl || image_url
    let targetPublicId = publicId || public_id
    let targetAlt = altText || alt_text || 'EcoMargin Logo'

    const validTypes = ['header', 'footer', 'favicon', 'white_logo']
    if (!targetType || !validTypes.includes(targetType)) {
      return res.status(400).json({
        success: false,
        message: 'Valid logo_type is required (header, footer, favicon, white_logo).'
      })
    }

    // If file buffer uploaded directly via multer
    if (req.file || (req.files && req.files[0])) {
      const file = req.file || req.files[0]

      // Format validation (PNG, SVG, JPG, WEBP)
      const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
      if (!allowedMimes.includes(file.mimetype) && !file.originalname.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
        return res.status(400).json({
          success: false,
          message: 'Unsupported image format. Allowed formats: PNG, SVG, JPG, WEBP.'
        })
      }

      // Size validation (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds maximum limit of 5MB.'
        })
      }

      // Stream upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'ecomargin_logos',
            resource_type: 'image',
            use_filename: true,
            unique_filename: true
          },
          (err, result) => {
            if (err) reject(err)
            else resolve(result)
          }
        )
        stream.end(file.buffer)
      })

      targetUrl = uploadResult.secure_url
      targetPublicId = uploadResult.public_id
    }

    if (!targetUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image file upload or imageUrl is required.'
      })
    }

    // Check if a logo record for this logoType already exists
    let existingLogo = await Logo.findOne({ where: { logoType: targetType } })

    if (existingLogo) {
      // Destroy previous Cloudinary image if replacing with a new public_id
      if (existingLogo.publicId && existingLogo.publicId !== targetPublicId) {
        try {
          await cloudinary.uploader.destroy(existingLogo.publicId)
        } catch (destroyErr) {
          console.warn('⚠️ Cloudinary cleanup notice:', destroyErr.message)
        }
      }

      existingLogo.imageUrl = targetUrl.trim()
      if (targetPublicId) existingLogo.publicId = targetPublicId
      if (targetAlt) existingLogo.altText = targetAlt.trim()

      await existingLogo.save()

      ActivityLog.log({
        action: 'Website Logo Updated',
        type: 'CMS',
        description: `Updated ${targetType} logo URL`,
        ipAddress: req.ip
      })

      return res.status(200).json({
        success: true,
        message: `${targetType.toUpperCase()} logo updated successfully`,
        data: existingLogo
      })
    } else {
      // Create new logo record
      const newLogo = await Logo.create({
        logoType: targetType,
        imageUrl: targetUrl.trim(),
        publicId: targetPublicId || null,
        altText: targetAlt.trim()
      })

      ActivityLog.log({
        action: 'Website Logo Uploaded',
        type: 'CMS',
        description: `Uploaded new ${targetType} logo`,
        ipAddress: req.ip
      })

      return res.status(201).json({
        success: true,
        message: `${targetType.toUpperCase()} logo uploaded successfully`,
        data: newLogo
      })
    }
  } catch (error) {
    console.error('❌ [Logo Upload Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload logo'
    })
  }
}

// PUT /api/logo/:id or /api/v1/admin/logo/:id
exports.updateLogo = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { altText, alt_text, imageUrl, image_url } = req.body

  try {
    const logo = await Logo.findByPk(id)
    if (!logo) {
      return res.status(404).json({ success: false, message: 'Logo record not found' })
    }

    const newAlt = altText || alt_text
    const newUrl = imageUrl || image_url

    if (newAlt !== undefined) logo.altText = newAlt.trim()
    if (newUrl !== undefined) logo.imageUrl = newUrl.trim()

    await logo.save()

    ActivityLog.log({
      action: 'Website Logo Metadata Updated',
      type: 'CMS',
      description: `Updated metadata for logo ID ${id}`,
      ipAddress: req.ip
    })

    return res.status(200).json({
      success: true,
      message: 'Logo metadata updated successfully',
      data: logo
    })
  } catch (error) {
    console.error('❌ [Update Logo Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update logo record'
    })
  }
}

// DELETE /api/logo/:id or /api/v1/admin/logo/:id
exports.deleteLogo = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  try {
    const logo = await Logo.findByPk(id)
    if (!logo) {
      return res.status(404).json({ success: false, message: 'Logo record not found' })
    }

    const logoTypeStr = logo.logoType

    // Destroy image from Cloudinary if public_id exists
    if (logo.publicId) {
      try {
        await cloudinary.uploader.destroy(logo.publicId)
        console.log(`🗑️ Destroyed Cloudinary logo asset: ${logo.publicId}`)
      } catch (cloudinaryErr) {
        console.warn('⚠️ Cloudinary deletion error:', cloudinaryErr.message)
      }
    }

    await logo.destroy()

    ActivityLog.log({
      action: 'Website Logo Deleted',
      type: 'CMS',
      description: `Deleted ${logoTypeStr} logo record (ID ${id})`,
      ipAddress: req.ip
    })

    return res.status(200).json({
      success: true,
      message: `${logoTypeStr.toUpperCase()} logo deleted successfully. Frontend will use default fallback.`
    })
  } catch (error) {
    console.error('❌ [Delete Logo Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete logo record'
    })
  }
}
