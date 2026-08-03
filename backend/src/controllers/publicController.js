// EcoMargin Backend — Public Dynamic Content Controller
// src/controllers/publicController.js

'use strict'

const { db } = require('../config/db.config')
const cmsController = require('./cmsController')
const leadController = require('./leadController')
const { Category, Industry, Project, Gallery, Blog, Download } = require('../models')

const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

// Public GET Homepage CMS
exports.getPublicHomepage = async (req, res) => {
  return cmsController.getHomepageCMS(req, res)
}

// Public GET About CMS
exports.getPublicAbout = async (req, res) => {
  return cmsController.getAboutCMS(req, res)
}

// Public GET Manufacturing CMS
exports.getPublicManufacturing = async (req, res) => {
  return cmsController.getManufacturingCMS(req, res)
}

// Public GET Footer CMS
exports.getPublicFooter = async (req, res) => {
  return cmsController.getFooterCMS(req, res)
}

// Public GET Contact CMS (Delegates to Footer/Contact CMS)
exports.getPublicContact = async (req, res) => {
  return cmsController.getFooterCMS(req, res)
}

// Public GET SEO CMS
exports.getPublicSEO = async (req, res) => {
  return cmsController.getSEOCMS(req, res)
}

// Public GET Active Categories
exports.getPublicCategories = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Category.findAll({
      where: { status: 'Active' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Categories Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Active Industries
exports.getPublicIndustries = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Industry.findAll({
      where: { status: 'Active' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Industries Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Active Projects
exports.getPublicProjects = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Project.findAll({
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Projects Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Active Gallery Images
exports.getPublicGallery = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Gallery.findAll({
      where: { status: 'Active' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Gallery Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Published Blogs
exports.getPublicBlogs = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Blog.findAll({
      where: { status: 'Published' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Blogs Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Published Blog by Slug
exports.getPublicBlogBySlug = async (req, res) => {
  setNoCache(res)
  try {
    const blog = await Blog.findOne({
      where: { slug: req.params.slug, status: 'Published' }
    })
    if (!blog) return res.status(404).json({ success: false, message: 'Blog article not found' })
    return res.status(200).json({ success: true, data: blog })
  } catch (err) {
    console.error('❌ [Public Blog Slug Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public GET Active Products Catalog
exports.getPublicProducts = async (req, res) => {
  setNoCache(res)
  try {
    if (db && typeof db.query === 'function') {
      const [rows] = await db.query('SELECT * FROM products WHERE status = "Active" ORDER BY display_order ASC, id DESC')
      if (rows && rows.length > 0) {
        return res.status(200).json({ success: true, data: rows })
      }
    }
  } catch (err) {
    console.warn('⚠️ [DB Notice] Serving default products data:', err.message)
  }

  res.status(200).json({
    success: true,
    data: [
      { id: 1, name: 'EcoWall 7.4kW AC Single Phase Charger', category: 'AC EV Chargers', power: '7.4kW', voltage: '230V AC', connector: 'Type 2 Gun', protection: 'IP55', efficiency: '>98%', warranty: '3 Years Warranty', datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/7.4kW-AC.pdf' },
      { id: 2, name: 'EcoPower 3.3kW LVDC Fleet Charger', category: 'LVDC Chargers', power: '3.3kW LVDC', voltage: '48V – 96V DC', connector: 'Anderson Heavy-Duty', protection: 'IP65', efficiency: '≥94%', warranty: '2 Years Warranty', datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/3.3kW-LVDC.pdf' },
      { id: 3, name: 'EcoCharge 60kW Dual Gun DC Fast Charger', category: 'DC Fast Chargers', power: '60kW DC', voltage: '200V – 1000V DC', connector: 'Dual CCS2 Guns', protection: 'IP55 Outdoor Cabinet', efficiency: '≥95.5%', warranty: '3 Years AMC Included', datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/60kW-DC.pdf' },
      { id: 4, name: 'EcoCharge 120kW Ultra-Fast DC Station', category: 'DC Fast Chargers', power: '120kW DC', voltage: '200V – 1000V DC', connector: 'Dual CCS2 Guns', protection: 'IP55 Weatherproof', efficiency: '≥96%', warranty: '3 Years Warranty', datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/120kW-DC.pdf' }
    ]
  })
}

// Public GET Active Services
exports.getPublicServices = async (req, res) => {
  setNoCache(res)
  try {
    if (db && typeof db.query === 'function') {
      const [rows] = await db.query('SELECT * FROM services WHERE status = "Active" ORDER BY display_order ASC, id DESC')
      if (rows && rows.length > 0) {
        return res.status(200).json({ success: true, data: rows })
      }
    }
  } catch (err) {
    console.warn('⚠️ [DB Notice] Serving default services data:', err.message)
  }

  res.status(200).json({
    success: true,
    data: [
      { id: 1, title: 'Turnkey EPC Station Installation', category: 'EPC Execution', description: 'Complete site feasibility, civil plinth work, HT transformer, DISCOM grid approval, and full commissioning.' },
      { id: 2, title: 'Power Load & Electrical Survey', category: 'Engineering', description: 'Engineering assessment of electrical grid capacity, soil testing, and optimal station layout design.' },
      { id: 3, title: 'Annual Maintenance Contracts (AMC)', category: 'Support & NOC', description: 'Comprehensive 24/7 NOC monitoring, preventative quarterly servicing, emergency technician dispatch, and SLA guarantees.' }
    ]
  })
}

// Public GET Technical Downloads
exports.getPublicDownloads = async (req, res) => {
  setNoCache(res)
  try {
    const rows = await Download.findAll({
      where: { status: 'Active' },
      order: [['displayOrder', 'ASC'], ['id', 'DESC']]
    })
    return res.status(200).json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ [Public Downloads Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// Public POST RFQ Enquiry Submission (Delegates to leadController.createLead)
exports.submitRFQEnquiry = async (req, res) => {
  return leadController.createLead(req, res)
}
