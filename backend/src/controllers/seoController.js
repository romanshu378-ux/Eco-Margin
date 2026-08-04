// EcoMargin Backend — Dynamic SEO, Sitemap, Robots & AI SEO Controller
// src/controllers/seoController.js

'use strict'

const { SEO, Product, Blog, Project, Service, Category, Download } = require('../models')
const { slugify } = require('../utils/slugify')

const SITE_URL = process.env.SITE_URL || 'https://www.ecomargin.in'

// ── 1. GET Dynamic Sitemap XML ───────────────────────────────────
exports.generateSitemap = async (req, res) => {
  try {
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/manufacturing', priority: '0.9', changefreq: 'monthly' },
      { url: '/products', priority: '0.95', changefreq: 'daily' },
      { url: '/services', priority: '0.9', changefreq: 'weekly' },
      { url: '/projects', priority: '0.85', changefreq: 'weekly' },
      { url: '/dealer-partner', priority: '0.8', changefreq: 'monthly' },
      { url: '/downloads', priority: '0.7', changefreq: 'weekly' },
      { url: '/contact', priority: '0.85', changefreq: 'monthly' },
      { url: '/blogs', priority: '0.8', changefreq: 'daily' },
      { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    ]

    const dynamicRoutes = []

    // Fetch Products
    try {
      const products = await Product.findAll({ attributes: ['id', 'name', 'slug', 'updatedAt'] })
      products.forEach((p) => {
        const slug = p.slug || slugify(p.name)
        dynamicRoutes.push({
          url: `/products/${slug}`,
          priority: '0.9',
          changefreq: 'weekly',
          lastmod: p.updatedAt ? p.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        })
      })
    } catch (e) {
      console.warn('⚠️ [Sitemap] Could not fetch dynamic products:', e.message)
    }

    // Fetch Blogs
    try {
      const blogs = await Blog.findAll({ attributes: ['id', 'title', 'slug', 'updatedAt'] })
      blogs.forEach((b) => {
        const slug = b.slug || slugify(b.title)
        dynamicRoutes.push({
          url: `/blogs/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: b.updatedAt ? b.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        })
      })
    } catch (e) {
      console.warn('⚠️ [Sitemap] Could not fetch dynamic blogs:', e.message)
    }

    const allRoutes = [...staticRoutes, ...dynamicRoutes]
    const today = new Date().toISOString().split('T')[0]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`

    allRoutes.forEach((route) => {
      xml += `  <url>\n`
      xml += `    <loc>${SITE_URL}${route.url}</loc>\n`
      xml += `    <lastmod>${route.lastmod || today}</lastmod>\n`
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`
      xml += `    <priority>${route.priority}</priority>\n`
      xml += `  </url>\n`
    })

    xml += `</urlset>`

    res.header('Content-Type', 'application/xml')
    res.header('Cache-Control', 'public, max-age=3600')
    return res.status(200).send(xml)
  } catch (err) {
    console.error('❌ [Sitemap Generation Error]:', err.message)
    return res.status(500).send('Error generating sitemap')
  }
}

// ── 2. GET Dynamic Robots.txt ─────────────────────────────────────
exports.generateRobotsTxt = async (req, res) => {
  const content = `# EcoMargin Infrastructure Pvt. Ltd. — Enterprise Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /uploads/private/

# Sitemap Location
Sitemap: ${SITE_URL}/sitemap.xml
`
  res.header('Content-Type', 'text/plain')
  res.header('Cache-Control', 'public, max-age=86400')
  return res.status(200).send(content)
}

// ── 3. GET Dynamic SEO Record by Route ────────────────────────────
exports.getSEOByRoute = async (req, res) => {
  try {
    const routeParam = req.query.route || req.params.route || '/'
    let record = await SEO.findOne({ where: { pageRoute: routeParam } })

    if (!record) {
      // Fallback to root route '/'
      record = await SEO.findOne({ where: { pageRoute: '/' } })
    }

    const defaultPayload = {
      pageRoute: routeParam,
      metaTitle: 'EcoMargin | OEM EV Charger Manufacturer & EPC Company',
      metaDescription: 'EcoMargin manufactures 3.3kW to 240kW commercial AC & DC chargers, OCPP CSMS software, and turnkey EPC charging station installation.',
      keywords: 'EV Charger Manufacturer, DC Fast Charger 60kW 120kW 240kW, AC Type 2 Charger, EV Charging Station EPC, OCPP 2.0.1 Software, ARAI Certified EV Charger India',
      focusKeyword: 'EV Charger Manufacturer',
      canonicalUrl: `${SITE_URL}${routeParam}`,
      robots: 'index, follow',
      ogTitle: 'EcoMargin | Dynamic EV Charging Solutions',
      ogDescription: 'Leading OEM EV Charger Manufacturer & Infrastructure EPC Contractor.',
      ogImage: `${SITE_URL}/og-image.jpg`,
      twitterCard: 'summary_large_image',
      schemaType: 'Organization',
      gscVerification: '',
      bingVerification: '',
      gaMeasurementId: '',
      gtmContainerId: '',
      clarityId: '',
    }

    return res.status(200).json({
      success: true,
      data: record ? record.toJSON() : defaultPayload,
    })
  } catch (err) {
    console.error('❌ [SEO Fetch Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}

// ── 4. AI / Auto SEO Meta Generator ──────────────────────────────
exports.generateAISEO = async (req, res) => {
  try {
    const { title, category, description, type = 'product' } = req.body

    const cleanTitle = title ? title.trim() : 'EV Charger'
    const slug = slugify(cleanTitle)

    let metaTitle = `${cleanTitle} | EcoMargin EV Charging`
    let metaDescription = description
      ? `${description.slice(0, 150)}... EcoMargin OEM EV Charger Manufacturer & EPC Supplier.`
      : `High performance ${cleanTitle} by EcoMargin. ARAI & CE certified, OCPP 2.0.1 compliant with 3-year warranty.`
    let keywords = `${cleanTitle}, EV Charger Manufacturer India, ${category || 'DC Fast Charger'}, OEM EV Charging Station, OCPP CSMS`
    let focusKeyword = cleanTitle
    let schemaType = type === 'product' ? 'Product' : type === 'blog' ? 'Article' : 'WebPage'

    const generated = {
      slug,
      metaTitle: metaTitle.slice(0, 70),
      metaDescription: metaDescription.slice(0, 160),
      keywords,
      focusKeyword,
      canonicalUrl: `${SITE_URL}/${type === 'product' ? 'products' : type === 'blog' ? 'blogs' : 'page'}/${slug}`,
      ogTitle: metaTitle,
      ogDescription: metaDescription,
      ogImage: `${SITE_URL}/og-image.jpg`,
      twitterCard: 'summary_large_image',
      schemaType,
    }

    return res.status(200).json({
      success: true,
      message: 'AI SEO Metadata Generated Successfully',
      data: generated,
    })
  } catch (err) {
    console.error('❌ [AI SEO Generation Error]:', err.message)
    return res.status(500).json({ success: false, message: err.message })
  }
}
