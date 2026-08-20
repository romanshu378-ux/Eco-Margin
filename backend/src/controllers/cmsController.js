// EcoMargin Backend — CMS Controller (Strict Database Persistence)
// src/controllers/cmsController.js

'use strict'

const { Homepage, About, Manufacturing, Footer, SEO } = require('../models')

// Helper function to set cache headers responsively
const setCacheHeaders = (req, res) => {
  const url = req.originalUrl || req.url || '';
  if (req.method === 'GET' && (
    url.includes('/public') || 
    url.includes('/footer') || 
    url.includes('/seo') || 
    url.includes('/contact') ||
    url.includes('/settings/public') ||
    url.includes('/homepage') ||
    url.includes('/about') ||
    url.includes('/manufacturing') ||
    url.includes('/logo')
  )) {
    res.setHeader('Cache-Control', 'public, max-age=300');
  } else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}

// Helper function to enforce no-cache headers for mutations
const setNoCache = (res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

// ── 1. HOMEPAGE CMS ─────────────────────────────────────────────

// GET Homepage CMS from database
exports.getHomepageCMS = async (req, res) => {
  const reqStart = Date.now();
  console.log('[Homepage API] request started');
  setCacheHeaders(req, res);
  try {
    console.log('[Homepage API] database query started');
    const dbStart = Date.now();
    
    const record = await Homepage.findOne({
      attributes: [
        'id', 'heroTitle', 'heroSubtitle', 'heroBackgroundImageUrl', 'heroVideoUrl', 'heroVideoPublicId',
        'primaryButtonText', 'secondaryButtonText', 'brochureButtonText',
        'stats', 'sectionVisibility', 'createdAt', 'updatedAt'
      ]
    });

    const dbDuration = Date.now() - dbStart;
    console.log(`[Homepage API] database query completed: ${dbDuration}ms`);

    const raw = record ? record.toJSON() : {};
    
    // Ensure both hero_background_image_url and heroVideoUrl are formatted in payload
    const formattedData = {
      ...raw,
      heroTitle: raw.heroTitle || "Powering India's EV Infrastructure",
      heroSubtitle: raw.heroSubtitle || "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
      hero_background_image_url: raw.heroBackgroundImageUrl || raw.hero_background_image_url || '',
      heroBackgroundImageUrl: raw.heroBackgroundImageUrl || raw.hero_background_image_url || '',
      heroVideoUrl: raw.heroVideoUrl || raw.hero_video_url || '',
      background_video_url: raw.heroVideoUrl || raw.hero_video_url || '',
      heroVideoPublicId: raw.heroVideoPublicId || raw.hero_video_public_id || '',
      video_public_id: raw.heroVideoPublicId || raw.hero_video_public_id || '',
      primaryButtonText: raw.primaryButtonText || "Request Quote",
      secondaryButtonText: raw.secondaryButtonText || "Contact Sales",
      brochureButtonText: raw.brochureButtonText || "Download Brochure",
      stats: raw.stats || [
        { label: "AC & DC Fast Range", value: "3.3kW – 240kW" },
        { label: "Certified Factory", value: "ISO & ARAI" },
        { label: "Network Uptime", value: "99.8%" }
      ],
      sectionVisibility: raw.sectionVisibility || {
        hero: true, intro: true, products: true, manufacturing: true,
        services: true, whyChooseUs: true, counter: true, industries: true,
        gallery: true, blogs: true, faq: true, contactCta: true
      },
      updated_at: raw.updatedAt || raw.updated_at || new Date().toISOString(),
      updatedAt: raw.updatedAt || raw.updated_at || new Date().toISOString()
    };

    const totalDuration = Date.now() - reqStart;
    console.log(`[Homepage API] response completed: ${totalDuration}ms`);

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: formattedData
    });
  } catch (err) {
    console.error('❌ [Homepage CMS Fetch Error]:', err.message);
    const errDuration = Date.now() - reqStart;
    console.log(`[Homepage API] error response completed: ${errDuration}ms`);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch Homepage CMS"
    });
  }
}

// PUT Homepage CMS to database (Updates existing MySQL record)
exports.updateHomepageCMS = async (req, res) => {
  console.log('📝 [PUT /api/cms/homepage] Request Payload:', JSON.stringify(req.body, null, 2));
  setNoCache(res);
  try {
    const newVideoUrl = (req.body.background_video_url || req.body.heroVideoUrl || req.body.hero_video_url || '').trim();
    const newPublicId = (req.body.video_public_id || req.body.heroVideoPublicId || req.body.hero_video_public_id || '').trim();

    let record = await Homepage.findOne();

    if (record) {
      // If old Cloudinary public_id exists and new public_id / videoUrl is different, destroy old video asset non-blockingly
      if (record.heroVideoPublicId && newPublicId && record.heroVideoPublicId !== newPublicId) {
        try {
          const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
          if (isCloudinaryConfigured()) {
            cloudinary.uploader.destroy(record.heroVideoPublicId, { resource_type: 'video' })
              .then(() => console.log(`🗑️ Destroyed old Cloudinary video asset: ${record.heroVideoPublicId}`))
              .catch(destroyErr => console.warn('⚠️ Cloudinary video cleanup notice:', destroyErr.message));
          }
        } catch (destroyErr) {
          console.warn('⚠️ Cloudinary video cleanup notice:', destroyErr.message);
        }
      }

      // Overwrite database fields
      const newImageUrl = (req.body.hero_background_image_url || req.body.heroBackgroundImageUrl || '').trim();
      if (newImageUrl || req.body.hero_background_image_url !== undefined || req.body.heroBackgroundImageUrl !== undefined) {
        record.heroBackgroundImageUrl = newImageUrl;
      }
      if (newVideoUrl) record.heroVideoUrl = newVideoUrl;
      if (newPublicId) record.heroVideoPublicId = newPublicId;
      if (req.body.heroTitle !== undefined) record.heroTitle = req.body.heroTitle;
      if (req.body.heroSubtitle !== undefined) record.heroSubtitle = req.body.heroSubtitle;
      if (req.body.primaryButtonText !== undefined) record.primaryButtonText = req.body.primaryButtonText;
      if (req.body.secondaryButtonText !== undefined) record.secondaryButtonText = req.body.secondaryButtonText;
      if (req.body.brochureButtonText !== undefined) record.brochureButtonText = req.body.brochureButtonText;
      if (req.body.stats !== undefined) record.stats = req.body.stats;
      if (req.body.sectionVisibility !== undefined) record.sectionVisibility = req.body.sectionVisibility;

      await record.save();
    } else {
      const newImageUrl = (req.body.hero_background_image_url || req.body.heroBackgroundImageUrl || '').trim();
      record = await Homepage.create({
        heroTitle: req.body.heroTitle || "Powering India's EV Infrastructure",
        heroSubtitle: req.body.heroSubtitle || "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
        heroBackgroundImageUrl: newImageUrl || "",
        heroVideoUrl: newVideoUrl || "",
        heroVideoPublicId: newPublicId || null,
        primaryButtonText: req.body.primaryButtonText || "Request Quote",
        secondaryButtonText: req.body.secondaryButtonText || "Contact Sales",
        brochureButtonText: req.body.brochureButtonText || "Download Brochure",
        stats: req.body.stats || [],
        sectionVisibility: req.body.sectionVisibility || {}
      });
    }

    const raw = record.toJSON();
    const responsePayload = {
      ...raw,
      hero_background_image_url: raw.heroBackgroundImageUrl || raw.hero_background_image_url || '',
      heroBackgroundImageUrl: raw.heroBackgroundImageUrl || raw.hero_background_image_url || '',
      heroVideoUrl: record.heroVideoUrl,
      background_video_url: record.heroVideoUrl,
      heroVideoPublicId: record.heroVideoPublicId,
      video_public_id: record.heroVideoPublicId,
      updated_at: record.updatedAt,
      updatedAt: record.updatedAt
    };

    console.log('✅ [Database Commit] Homepage CMS updated successfully in MySQL table');
    return res.status(200).json({
      success: true,
      message: "Homepage CMS updated successfully",
      data: responsePayload
    });
  } catch (err) {
    console.error('❌ [Homepage CMS Save Error]:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Homepage CMS"
    });
  }
}

// ── 2. ABOUT CMS ────────────────────────────────────────────────

// GET About CMS from database
exports.getAboutCMS = async (req, res) => {
  setCacheHeaders(req, res)
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
  setCacheHeaders(req, res)
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
  const defaultFooterPayload = {
    companyName: 'EcoMargin LLP',
    address: 'NH-11, iStart Nest, Govt Engineering College, Bharatpur, Rajasthan - 321001',
    phone: '+91-8302313065',
    altPhone: '',
    email: 'support@ecomargin.in',
    supportEmail: 'support@ecomargin.in',
    businessHours: 'Monday - Saturday: 09:00 AM - 07:00 PM',
    whatsapp: '+91-8302313065',
    googleMapsEmbedUrl: 'https://maps.google.com/?q=Government+Engineering+College+Bharatpur',
    copyright: '© 2026 EcoMargin LLP. All Rights Reserved.'
  }
  setCacheHeaders(req, res)
  try {
    const record = await Footer.findOne()
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: record ? record.toJSON() : defaultFooterPayload
    })
  } catch (err) {
    console.warn('⚠️ [Footer CMS Optional Fallback Triggered - Fetch Error]:', err.message)
    return res.status(200).json({
      success: true,
      message: "Serving default fallback Footer CMS data",
      data: defaultFooterPayload
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
  setCacheHeaders(req, res)
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
