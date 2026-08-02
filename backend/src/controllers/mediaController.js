// EcoMargin Backend — Cloudinary Media Upload & Delete Controller
// src/controllers/mediaController.js

'use strict'

const cloudinary = require('../config/cloudinary')

/**
 * Upload single or multiple files to Cloudinary (Images, Videos, PDFs)
 */
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file && !req.files) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const uploadedFile = req.file || (req.files && req.files[0])
    
    // Determine Cloudinary resource type
    let resourceType = 'auto'
    if (uploadedFile.mimetype.includes('pdf')) {
      resourceType = 'raw'
    } else if (uploadedFile.mimetype.includes('video')) {
      resourceType = 'video'
    }

    // Direct stream upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecomargin_media',
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(uploadedFile.buffer)
    })

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully to Cloudinary',
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format || 'pdf',
        resource_type: result.resource_type,
        bytes: result.bytes
      }
    })
  } catch (error) {
    console.error('❌ Cloudinary Upload Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to upload media to Cloudinary',
      error: error.message
    })
  }
}

/**
 * Delete a media resource from Cloudinary by public_id
 */
exports.deleteMedia = async (req, res) => {
  try {
    const { public_id, resource_type = 'image' } = req.body

    if (!public_id) {
      return res.status(400).json({ success: false, message: 'public_id is required for deletion' })
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type
    })

    return res.status(200).json({
      success: true,
      message: 'Media deleted from Cloudinary successfully',
      result
    })
  } catch (error) {
    console.error('❌ Cloudinary Delete Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete media from Cloudinary',
      error: error.message
    })
  }
}
