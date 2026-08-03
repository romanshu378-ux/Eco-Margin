// EcoMargin Backend — CMS Controller (Strict Database Persistence)
// src/controllers/cmsController.js

'use strict'

const { Homepage, About, Manufacturing, Footer, SEO } = require('../models')

// Helper function to set strict no-cache headers
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// ── 1. HOMEPAGE CMS ─────────────────────────────────────────────

// GET Homepage CMS from database
exports.getHomepageCMS = async (req, res) => {
  setNoCache(res)
  try {
    const record = await Homepage.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : {}
    })
  } catch (err) {
    console.error('❌ [Homepage CMS Fetch Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch Homepage CMS"
    })
  }
}

// PUT Homepage CMS to database only
exports.updateHomepageCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/homepage] Request Payload:', JSON.stringify(req.body, null, 2))
  setNoCache(res)
  try {
    let record = await Homepage.findOne()
    if (record) {
      await record.update(req.body)
    } else {
      record = await Homepage.create(req.body)
    }
    console.log('✅ [Database Commit] Homepage CMS updated successfully in database')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: record.toJSON()
    })
  } catch (err) {
    console.error('❌ [Homepage CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Homepage CMS"
    })
  }
}

// ── 2. ABOUT CMS ────────────────────────────────────────────────

// GET About CMS from database
exports.getAboutCMS = async (req, res) => {
  setNoCache(res)
  try {
    const record = await About.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : {}
    })
  } catch (err) {
    console.error('❌ [About CMS Fetch Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch About CMS"
    })
  }
}

// PUT About CMS to database only
exports.updateAboutCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/about] Request Payload:', JSON.stringify(req.body, null, 2))
  setNoCache(res)
  try {
    let record = await About.findOne()
    if (record) {
      await record.update(req.body)
    } else {
      record = await About.create(req.body)
    }
    console.log('✅ [Database Commit] About CMS updated successfully in database')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: record.toJSON()
    })
  } catch (err) {
    console.error('❌ [About CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save About CMS"
    })
  }
}

// ── 3. MANUFACTURING CMS ────────────────────────────────────────

// GET Manufacturing CMS from database
exports.getManufacturingCMS = async (req, res) => {
  setNoCache(res)
  try {
    const record = await Manufacturing.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : {}
    })
  } catch (err) {
    console.error('❌ [Manufacturing CMS Fetch Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch Manufacturing CMS"
    })
  }
}

// PUT Manufacturing CMS to database only
exports.updateManufacturingCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/manufacturing] Request Payload:', JSON.stringify(req.body, null, 2))
  setNoCache(res)
  try {
    let record = await Manufacturing.findOne()
    if (record) {
      await record.update(req.body)
    } else {
      record = await Manufacturing.create(req.body)
    }
    console.log('✅ [Database Commit] Manufacturing CMS updated successfully in database')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: record.toJSON()
    })
  } catch (err) {
    console.error('❌ [Manufacturing CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Manufacturing CMS"
    })
  }
}

// ── 4. FOOTER CMS ───────────────────────────────────────────────

// GET Footer CMS from database
exports.getFooterCMS = async (req, res) => {
  setNoCache(res)
  try {
    const record = await Footer.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : {}
    })
  } catch (err) {
    console.error('❌ [Footer CMS Fetch Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch Footer CMS"
    })
  }
}

// PUT Footer CMS to database only
exports.updateFooterCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/footer] Request Payload:', JSON.stringify(req.body, null, 2))
  setNoCache(res)
  try {
    let record = await Footer.findOne()
    if (record) {
      await record.update(req.body)
    } else {
      record = await Footer.create(req.body)
    }
    console.log('✅ [Database Commit] Footer CMS updated successfully in database')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: record.toJSON()
    })
  } catch (err) {
    console.error('❌ [Footer CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Footer CMS"
    })
  }
}

// ── 5. SEO CMS ──────────────────────────────────────────────────

// GET SEO CMS from database
exports.getSEOCMS = async (req, res) => {
  setNoCache(res)
  try {
    const record = await SEO.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : {}
    })
  } catch (err) {
    console.error('❌ [SEO CMS Fetch Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch SEO CMS"
    })
  }
}

// PUT SEO CMS to database only
exports.updateSEOCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/seo] Request Payload:', JSON.stringify(req.body, null, 2))
  setNoCache(res)
  try {
    let record = await SEO.findOne()
    if (record) {
      await record.update(req.body)
    } else {
      record = await SEO.create(req.body)
    }
    console.log('✅ [Database Commit] SEO CMS updated successfully in database')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: record.toJSON()
    })
  } catch (err) {
    console.error('❌ [SEO CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save SEO CMS"
    })
  }
}

// ── 6. GET Analytics ────────────────────────────────────────────
exports.getAnalytics = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    data: {
      totalVisitors: 45280,
      totalProducts: 14,
      totalProjects: 128,
      totalEnquiries: 850,
      todayLeads: 12
    }
  })
}
