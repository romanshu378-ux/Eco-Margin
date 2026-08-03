// EcoMargin — Cloudinary Configuration & Image Service
// src/config/cloudinary.js

'use strict'

const cloudinary = require('cloudinary').v2
require('dotenv').config()

// ── Configure Cloudinary Credentials ──────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

/**
 * Helper to check if Cloudinary SDK is initialized with valid credentials
 */
const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    cloudinary &&
    cloudinary.uploader &&
    typeof cloudinary.uploader.upload_stream === 'function'
  )
}

/**
 * Direct Base64 or Buffer Image Upload Helper
 * @param {string} fileStream - File path, base64 string, or remote URL
 * @param {string} folder - Destination folder on Cloudinary
 * @returns {Promise<object>} Upload response object containing secure_url and public_id
 */
const uploadImage = async (fileStream, folder = 'ecomargin/uploads') => {
  try {
    if (!isCloudinaryConfigured()) {
      throw new Error('Cloudinary SDK is uninitialized. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.')
    }
    const result = await cloudinary.uploader.upload(fileStream, {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' }
      ]
    })
    console.log(`📸 [Cloudinary] Image uploaded successfully: ${result.public_id}`)
    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    }
  } catch (error) {
    console.error(`❌ [Cloudinary Upload Error]: ${error.message}`)
    throw error
  }
}

/**
 * Delete Image from Cloudinary by Public ID
 * @param {string} publicId - Cloudinary Public ID of the image
 * @returns {Promise<object>} Deletion result
 */
const deleteImage = async (publicId) => {
  try {
    if (!publicId || !isCloudinaryConfigured()) return null
    const result = await cloudinary.uploader.destroy(publicId)
    console.log(`🗑️ [Cloudinary] Image deleted: ${publicId}`)
    return result
  } catch (error) {
    console.error(`❌ [Cloudinary Delete Error]: ${error.message}`)
    throw error
  }
}

/**
 * Update Image on Cloudinary (Deletes old public ID and uploads new file)
 * @param {string} oldPublicId - Existing Cloudinary public ID
 * @param {string} newFileStream - New image file path / stream / base64
 * @param {string} folder - Destination folder
 */
const updateImage = async (oldPublicId, newFileStream, folder = 'ecomargin/uploads') => {
  if (oldPublicId) {
    await deleteImage(oldPublicId)
  }
  return uploadImage(newFileStream, folder)
}

/**
 * Generates an Optimized Image URL with custom dimensions and quality
 * @param {string} publicId - Cloudinary Public ID
 * @param {object} options - Width, height, crop mode
 * @returns {string} Transformed image URL
 */
const optimizeImageUrl = (publicId, options = { width: 800, height: 600, crop: 'limit' }) => {
  if (!publicId) return ''
  return cloudinary.url(publicId, {
    width: options.width,
    height: options.height,
    crop: options.crop || 'limit',
    quality: 'auto',
    fetch_format: 'auto',
    secure: true
  })
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  uploadImage,
  deleteImage,
  updateImage,
  optimizeImageUrl
}
