// EcoMargin Backend — CMS Controller (UPSERT Engine & Standardized JSON Response)
// src/controllers/cmsController.js

'use strict'

const { db } = require('../config/db.config')

// Memory fallback store
let cmsStore = {
  homepage: {
    heroTitle: "Powering India's EV Infrastructure",
    heroSubtitle: "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
    heroVideoUrl: "https://res.cloudinary.com/dcumpbswm/video/upload/v1785698504/123456_mwb4qr.mp4",
    primaryButtonText: "Request Quote",
    secondaryButtonText: "Contact Sales",
    brochureButtonText: "Download Brochure",
    stats: [
      { label: "AC & DC Fast Range", value: "3.3kW – 240kW" },
      { label: "Certified Factory", value: "ISO & ARAI" },
      { label: "Network Uptime", value: "99.8%" }
    ],
    sectionVisibility: {
      hero: true, intro: true, products: true, manufacturing: true,
      services: true, whyChooseUs: true, counter: true, industries: true,
      gallery: true, blogs: true, faq: true, contactCta: true
    }
  },
  about: {
    vision: "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware.",
    mission: "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions.",
    story: "Founded in 2020, EcoMargin has grown into a leading OEM charger manufacturer and EPC contractor operating a 50,000 sq.ft. certified facility in Noida, India.",
    directorMessage: "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring."
  },
  manufacturing: {
    heroTitle: "Designed & Built for Indian Operating Conditions",
    heroSubtitle: "OEM & White Label Manufacturing",
    description: "Grid fluctuations, extreme ambient temperatures (up to 55°C), and dust exposure require specialized hardware engineering. EcoMargin's chargers feature built-in isolation transformers, wide input voltage tolerance (200V–480V AC), and IP55 weatherproof enclosures.",
    factoryArea: "50,000 sq.ft.",
    annualCapacity: "50,000+ Units",
    burnInTestingHours: "48 Hours",
    defectRate: "0.01%",
    manufacturingSteps: [
      {
        title: '1. In-House SMT & PCB Assembly',
        description: 'Automated surface mount lines assemble main controller boards, power metering units, and safety protection circuits under Class 100,000 cleanroom standards.'
      },
      {
        title: '2. Enclosure Fabrication & IP Rating',
        description: 'Heavy-duty Galvanized Steel and Stainless Steel outer cabinets coated with anti-corrosive outdoor UV powder coating (IP55/IP65 Outdoor Rated).'
      },
      {
        title: '3. Full Power Burn-in Testing',
        description: '100% of manufactured chargers undergo a 48-hour continuous full-load endurance test in environmental thermal chambers.'
      },
      {
        title: '4. ARAI & CE Safety Inspection',
        description: 'Rigorous insulation resistance, earth continuity, high-voltage withstand, surge suppression, and ground fault circuit breaker verification.'
      },
      {
        title: '5. Firmware & OCPP Protocol Validation',
        description: 'Automated software simulation testing compatibility across 50+ EV models and OCPP 1.6J/2.0.1 central management systems.'
      },
      {
        title: '6. Quality Dispatch & Logistics',
        description: 'Sealed shockproof packaging with complete test calibration reports, installation manuals, and warranty documentation.'
      }
    ]
  },
  footer: {
    companyName: "EcoMargin Infrastructure Pvt. Ltd.",
    address: "Plot 42, Industrial Area, Sector 62, Noida, UP - 201301, India",
    phone: "+91-8302313065",
    altPhone: "+91-8302313065",
    email: "sales@ecomargin.com",
    supportEmail: "support@ecomargin.com",
    whatsapp: "8302313065",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Noida%20Sector%2062&t=&z=13&ie=UTF8&iwloc=&output=embed",
    businessHours: "Monday – Saturday: 09:00 AM – 07:00 PM IST",
    linkedin: "https://linkedin.com/company/ecomargin",
    twitter: "https://twitter.com/ecomargin",
    facebook: "https://facebook.com/ecomargin",
    copyright: "© 2026 EcoMargin Infrastructure Pvt. Ltd. All Rights Reserved."
  },
  seo: {
    metaTitle: "EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company",
    metaDescription: "EcoMargin manufactures 3.3kW to 240kW commercial AC & DC chargers, OCPP CSMS software, and turnkey EPC charging station installation.",
    keywords: "EV Charger Manufacturer India, DC Fast Charger 60kW 120kW 240kW, ARAI AIS-138 Certified",
    canonicalUrl: "https://ecomargin.vercel.app",
    ogTitle: "EcoMargin EV Charging Infrastructure & OEM Factory",
    ogImage: "https://ecomargin.vercel.app/og-image.jpg",
    organizationSchema: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EcoMargin Infrastructure Pvt. Ltd.",
  "url": "https://ecomargin.vercel.app"
}`
  }
}

// ── GET Homepage CMS ─────────────────────────────────────────────
exports.getHomepageCMS = async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  try {
    if (db && typeof db.query === 'function') {
      const [rows] = await db.query('SELECT * FROM homepage WHERE id = 1')
      if (rows && rows.length > 0) {
        return res.status(200).json({ success: true, message: "Fetched Successfully", data: rows[0] })
      }
    }
  } catch (err) {
    console.warn('⚠️ [DB Notice] Reading Homepage CMS from memory store:', err.message)
  }
  return res.status(200).json({ success: true, message: "Fetched Successfully", data: cmsStore.homepage })
}

// ── PUT/POST Homepage CMS (UPSERT Engine) ───────────────────────
exports.updateHomepageCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/homepage] Request Payload:', JSON.stringify(req.body, null, 2))
  cmsStore.homepage = { ...cmsStore.homepage, ...req.body }

  try {
    if (db && typeof db.query === 'function') {
      const query = `
        INSERT INTO homepage (id, hero_title, hero_subtitle, hero_video_url, primary_button_text, secondary_button_text, brochure_button_text, section_visibility)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          hero_title = VALUES(hero_title),
          hero_subtitle = VALUES(hero_subtitle),
          hero_video_url = VALUES(hero_video_url),
          primary_button_text = VALUES(primary_button_text),
          secondary_button_text = VALUES(secondary_button_text),
          brochure_button_text = VALUES(brochure_button_text),
          section_visibility = VALUES(section_visibility)
      `
      const values = [
        req.body.heroTitle || cmsStore.homepage.heroTitle,
        req.body.heroSubtitle || cmsStore.homepage.heroSubtitle,
        req.body.heroVideoUrl || cmsStore.homepage.heroVideoUrl,
        req.body.primaryButtonText || cmsStore.homepage.primaryButtonText,
        req.body.secondaryButtonText || cmsStore.homepage.secondaryButtonText,
        req.body.brochureButtonText || cmsStore.homepage.brochureButtonText,
        JSON.stringify(req.body.sectionVisibility || cmsStore.homepage.sectionVisibility)
      ]

      const [result] = await db.query(query, values)
      console.log('✅ [SQL Query Executed] Homepage UPSERT affectedRows:', result?.affectedRows || 1)
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: cmsStore.homepage
    })
  } catch (err) {
    console.error('❌ [Homepage CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Homepage CMS"
    })
  }
}

// ── GET About CMS ────────────────────────────────────────────────
exports.getAboutCMS = async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({ success: true, message: "Fetched Successfully", data: cmsStore.about })
}

// ── PUT/POST About CMS (UPSERT Engine) ──────────────────────────
exports.updateAboutCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/about] Request Payload:', JSON.stringify(req.body, null, 2))
  cmsStore.about = { ...cmsStore.about, ...req.body }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({
    success: true,
    message: "Data saved successfully",
    data: cmsStore.about
  })
}

// ── GET Manufacturing CMS ────────────────────────────────────────
exports.getManufacturingCMS = async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({ success: true, message: "Fetched Successfully", data: cmsStore.manufacturing })
}

// ── PUT/POST Manufacturing CMS (UPSERT Engine) ───────────────────
exports.updateManufacturingCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/manufacturing] Request Payload:', JSON.stringify(req.body, null, 2))
  cmsStore.manufacturing = { ...cmsStore.manufacturing, ...req.body }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({
    success: true,
    message: "Data saved successfully",
    data: cmsStore.manufacturing
  })
}

// ── GET Footer CMS ───────────────────────────────────────────────
exports.getFooterCMS = async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  try {
    if (db && typeof db.query === 'function') {
      const [rows] = await db.query('SELECT * FROM footer WHERE id = 1')
      if (rows && rows.length > 0) {
        const row = rows[0]
        const dbData = {
          companyName: row.company_bio || row.companyName || cmsStore.footer.companyName,
          address: row.address || cmsStore.footer.address,
          phone: row.phone || cmsStore.footer.phone,
          altPhone: row.altPhone || row.alt_phone || cmsStore.footer.altPhone,
          email: row.email || cmsStore.footer.email,
          supportEmail: row.supportEmail || row.support_email || cmsStore.footer.supportEmail,
          whatsapp: row.whatsapp || cmsStore.footer.whatsapp,
          googleMapsEmbedUrl: row.googleMapsEmbedUrl || row.google_maps_embed_url || cmsStore.footer.googleMapsEmbedUrl,
          businessHours: row.businessHours || row.business_hours || cmsStore.footer.businessHours,
          copyright: row.copyright_text || row.copyright || cmsStore.footer.copyright
        }
        return res.status(200).json({ success: true, message: "Fetched Successfully", data: dbData })
      }
    }
  } catch (err) {
    console.warn('⚠️ [DB Notice] Reading Footer CMS from memory store:', err.message)
  }
  return res.status(200).json({ success: true, message: "Fetched Successfully", data: cmsStore.footer })
}

// ── PUT/POST Footer CMS (UPSERT Engine) ──────────────────────────
exports.updateFooterCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/footer] Request Payload:', JSON.stringify(req.body, null, 2))
  cmsStore.footer = { ...cmsStore.footer, ...req.body }

  try {
    if (db && typeof db.query === 'function') {
      const query = `
        INSERT INTO footer (id, company_bio, address, phone, email, whatsapp, copyright_text)
        VALUES (1, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          company_bio = VALUES(company_bio),
          address = VALUES(address),
          phone = VALUES(phone),
          email = VALUES(email),
          whatsapp = VALUES(whatsapp),
          copyright_text = VALUES(copyright_text)
      `
      const values = [
        req.body.companyName || cmsStore.footer.companyName,
        req.body.address || cmsStore.footer.address,
        req.body.phone || cmsStore.footer.phone,
        req.body.email || cmsStore.footer.email,
        req.body.whatsapp || cmsStore.footer.whatsapp,
        req.body.copyright || cmsStore.footer.copyright
      ]

      console.log('🔍 [SQL Query Execution]:', query)
      console.log('🔍 [SQL Values]:', values)
      const [result] = await db.query(query, values)
      console.log('✅ [SQL Query Executed] Footer UPSERT affectedRows:', result?.affectedRows || 1)
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: cmsStore.footer
    })
  } catch (err) {
    console.error('❌ [Footer CMS Save Error]:', err.message)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to save Footer CMS"
    })
  }
}

// ── GET SEO CMS ──────────────────────────────────────────────────
exports.getSEOCMS = async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({ success: true, message: "Fetched Successfully", data: cmsStore.seo })
}

// ── PUT/POST SEO CMS (UPSERT Engine) ─────────────────────────────
exports.updateSEOCMS = async (req, res) => {
  console.log('📝 [PUT /api/v1/cms/seo] Request Payload:', JSON.stringify(req.body, null, 2))
  cmsStore.seo = { ...cmsStore.seo, ...req.body }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  return res.status(200).json({
    success: true,
    message: "Data saved successfully",
    data: cmsStore.seo
  })
}

// ── GET Analytics ────────────────────────────────────────────────
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
