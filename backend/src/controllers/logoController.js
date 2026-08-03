// EcoMargin Backend — Logo Manager CMS Controller
// src/controllers/logoController.js

'use strict'

const { Logo, ActivityLog } = require('../models')
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary')
const { sequelize } = require('../config/database')

// Helper for cache headers
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// Safely ensure website_logo table exists
async function autoMigrateLogosSchema() {
  try {
    await Logo.sync({ alter: false })
  } catch (err) {
    // Table already exists or initialized
  }
}

/**
 * Extracts Cloudinary Public ID automatically from a Cloudinary Image URL.
 * Example: https://res.cloudinary.com/demo/image/upload/v175425/ecomargin_logos/header_logo.png
 * Returns: ecomargin_logos/header_logo
 */
function extractCloudinaryPublicId(url) {
  if (!url || typeof url !== 'string') return ''
  try {
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) return ''
    let path = url.substring(uploadIndex + 8) // After /upload/
    // Strip version number like v175425123/ if present
    path = path.replace(/^v\d+\//, '')
    // Strip file extension (.png, .jpg, .svg, .webp)
    const dotIndex = path.lastIndexOf('.')
    if (dotIndex !== -1) {
      path = path.substring(0, dotIndex)
    }
    return path
  } catch (err) {
    return ''
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
      map: logoMap,
      headerLogo: logoMap.header,
      footerLogo: logoMap.footer,
      whiteLogo: logoMap.white_logo,
      favicon: logoMap.favicon
    })
  } catch (error) {
    console.error('❌ [Logos Fetch Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch website logos'
    })
  }
}

// POST /api/logo/url or /api/v1/admin/logo/url (Save Existing Cloudinary Image URL)
exports.saveLogoUrl = async (req, res) => {
  setNoCache(res)
  try {
    await autoMigrateLogosSchema()

    const { logoType, logo_type, imageUrl, image_url, publicId, public_id, altText, alt_text } = req.body

    const targetType = logoType || logo_type
    const targetUrl = (imageUrl || image_url || '').trim()
    let targetPublicId = (publicId || public_id || '').trim()
    const targetAlt = (altText || alt_text || `EcoMargin ${targetType} Logo`).trim()

    const validTypes = ['header', 'footer', 'favicon', 'white_logo']
    if (!targetType || !validTypes.includes(targetType)) {
      return res.status(400).json({
        success: false,
        message: 'Valid logoType is required (header, footer, favicon, white_logo).'
      })
    }

    if (!targetUrl) {
      return res.status(400).json({
        success: false,
        message: 'Cloudinary Image URL is required.'
      })
    }

    // Validate that URL is an official Cloudinary URL
    if (!targetUrl.includes('cloudinary.com')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL. Only official Cloudinary Image URLs (e.g. https://res.cloudinary.com/...) are allowed.'
      })
    }

    // Auto-extract Public ID if empty
    if (!targetPublicId) {
      targetPublicId = extractCloudinaryPublicId(targetUrl)
    }

    let existingLogo = await Logo.findOne({ where: { logoType: targetType } })

    if (existingLogo) {
      existingLogo.imageUrl = targetUrl
      existingLogo.publicId = targetPublicId || existingLogo.publicId
      existingLogo.altText = targetAlt
      await existingLogo.save()

      ActivityLog.log({
        action: 'Website Logo URL Saved',
        type: 'CMS',
        description: `Saved ${targetType} Cloudinary image URL`,
        ipAddress: req.ip
      })

      return res.status(200).json({
        success: true,
        message: `${targetType.toUpperCase()} logo URL saved successfully`,
        data: existingLogo
      })
    } else {
      const newLogo = await Logo.create({
        logoType: targetType,
        imageUrl: targetUrl,
        publicId: targetPublicId || null,
        altText: targetAlt
      })

      ActivityLog.log({
        action: 'Website Logo URL Saved',
        type: 'CMS',
        description: `Saved new ${targetType} Cloudinary image URL`,
        ipAddress: req.ip
      })

      return res.status(201).json({
        success: true,
        message: `${targetType.toUpperCase()} logo URL saved successfully`,
        data: newLogo
      })
    }
  } catch (error) {
    console.error('❌ [Logo URL Save Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to save logo URL'
    })
  }
}

// POST /api/logo/upload or /api/v1/admin/logo/upload (Upload Image File to Cloudinary)
exports.uploadLogo = async (req, res) => {
  setNoCache(res)
  try {
    await autoMigrateLogosSchema()

    // Gracefully handle missing or uninitialized Cloudinary SDK credentials
    if (!isCloudinaryConfigured()) {
      console.error('❌ Cloudinary Error: SDK is missing configuration or environment variables.')
      return res.status(500).json({
        success: false,
        message: 'Cloudinary SDK is not properly configured. Please verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.'
      })
    }

    const { logoType, logo_type, altText, alt_text } = req.body
    const targetType = logoType || logo_type
    const targetAlt = (altText || alt_text || `EcoMargin ${targetType} Logo`).trim()

    const validTypes = ['header', 'footer', 'favicon', 'white_logo']
    if (!targetType || !validTypes.includes(targetType)) {
      return res.status(400).json({
        success: false,
        message: 'Valid logoType is required (header, footer, favicon, white_logo).'
      })
    }

    if (!req.file && (!req.files || !req.files[0])) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image file to upload.'
      })
    }

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

    const targetUrl = uploadResult.secure_url
    const targetPublicId = uploadResult.public_id

    let existingLogo = await Logo.findOne({ where: { logoType: targetType } })

    if (existingLogo) {
      // Destroy previous Cloudinary asset if replacing
      if (existingLogo.publicId && existingLogo.publicId !== targetPublicId) {
        try {
          await cloudinary.uploader.destroy(existingLogo.publicId)
        } catch (destroyErr) {
          console.warn('⚠️ Cloudinary cleanup notice:', destroyErr.message)
        }
      }

      existingLogo.imageUrl = targetUrl
      existingLogo.publicId = targetPublicId
      existingLogo.altText = targetAlt

      await existingLogo.save()

      ActivityLog.log({
        action: 'Website Logo File Uploaded',
        type: 'CMS',
        description: `Uploaded and replaced ${targetType} logo file on Cloudinary`,
        ipAddress: req.ip
      })

      return res.status(200).json({
        success: true,
        message: `${targetType.toUpperCase()} logo uploaded successfully to Cloudinary`,
        data: existingLogo
      })
    } else {
      const newLogo = await Logo.create({
        logoType: targetType,
        imageUrl: targetUrl,
        publicId: targetPublicId,
        altText: targetAlt
      })

      ActivityLog.log({
        action: 'Website Logo File Uploaded',
        type: 'CMS',
        description: `Uploaded new ${targetType} logo file on Cloudinary`,
        ipAddress: req.ip
      })

      return res.status(201).json({
        success: true,
        message: `${targetType.toUpperCase()} logo uploaded successfully to Cloudinary`,
        data: newLogo
      })
    }
  } catch (error) {
    console.error('❌ [Logo Upload Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload logo to Cloudinary'
    })
  }
}

// PUT /api/logo/:id or /api/v1/admin/logo/:id
exports.updateLogo = async (req, res) => {
  setNoCache(res)
  const { id } = req.params
  const { altText, alt_text, imageUrl, image_url, publicId, public_id } = req.body

  try {
    const logo = await Logo.findByPk(id)
    if (!logo) {
      return res.status(404).json({ success: false, message: 'Logo record not found' })
    }

    const newAlt = altText || alt_text
    const newUrl = imageUrl || image_url
    const newPublicId = publicId || public_id

    if (newAlt !== undefined) logo.altText = newAlt.trim()
    if (newUrl !== undefined) logo.imageUrl = newUrl.trim()
    if (newPublicId !== undefined) logo.publicId = newPublicId.trim()

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

    // Destroy image from Cloudinary if public_id exists and Cloudinary is configured
    if (logo.publicId && isCloudinaryConfigured()) {
      try {
        await cloudinary.uploader.destroy(logo.publicId)
        console.log(`🗑️ Destroyed Cloudinary logo asset: ${logo.publicId}`)
      } catch (cloudinaryErr) {
        console.warn('⚠️ Cloudinary deletion notice:', cloudinaryErr.message)
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
      message: `${logoTypeStr.toUpperCase()} logo deleted successfully. Frontend reset to default asset logo.`
    })
  } catch (error) {
    console.error('❌ [Delete Logo Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete logo record'
    })
  }
}
