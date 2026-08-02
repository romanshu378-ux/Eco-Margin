// EcoMargin Backend — CMS Controller
// src/controllers/cmsController.js

'use strict'

// In-memory / DB Store for CMS Content
let cmsData = {
  homepage: {
    heroTitle: "Powering India's EV Infrastructure",
    heroSubtitle: "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
    heroVideoUrl: "https://res.cloudinary.com/ecomargin/video/upload/v1/hero-ev.mp4",
    heroBgUrl: "",
    buttons: {
      primaryText: "Request Quote",
      secondaryText: "Contact Sales",
      brochureText: "Download Brochure"
    },
    statistics: [
      { label: "AC & DC Fast Range", value: "3.3kW – 240kW" },
      { label: "Certified Factory", value: "ISO & ARAI" },
      { label: "Network Uptime", value: "99.8%" }
    ],
    sectionsVisibility: {
      hero: true,
      intro: true,
      products: true,
      manufacturing: true,
      services: true,
      whyChooseUs: true,
      counter: true,
      industries: true,
      gallery: true,
      blogs: true,
      faq: true,
      contactCta: true
    }
  },
  about: {
    vision: "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware.",
    mission: "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions.",
    story: "Founded in 2020, EcoMargin has grown into a leading OEM charger manufacturer and EPC contractor with 50,000 sq.ft. facility.",
    directorMessage: "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring.",
    timeline: [
      { year: "2020", title: "R&D Facility Established", desc: "Started indigenous controller board development." },
      { year: "2022", title: "ARAI AIS-138 Certification", desc: "Launched first 60kW DC Fast Charger." },
      { year: "2024", title: "50,000 Units Production", desc: "Expanded manufacturing plant for 240kW Ultra-Fast stations." }
    ]
  },
  footer: {
    companyName: "EcoMargin Infrastructure Pvt. Ltd.",
    address: "Plot 42, Industrial Area, Sector 62, Noida, UP - 201301",
    phone: "+91-99999-99999",
    email: "sales@ecomargin.com",
    whatsapp: "+919999999999",
    socialLinks: {
      linkedin: "https://linkedin.com/company/ecomargin",
      twitter: "https://twitter.com/ecomargin",
      facebook: "https://facebook.com/ecomargin"
    },
    copyright: "© 2026 EcoMargin Infrastructure Pvt. Ltd. All Rights Reserved."
  },
  seo: {
    metaTitle: "EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company",
    metaDescription: "OEM Manufacturer of 3.3kW to 240kW commercial AC & DC chargers, OCPP CSMS Software, and EPC turnkey installation.",
    keywords: "EV Charger Manufacturer India, DC Fast Charger 60kW 120kW 240kW, ARAI AIS-138 Certified",
    openGraphImage: "https://ecomargin.vercel.app/og-image.jpg",
    canonicalUrl: "https://ecomargin.vercel.app",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://ecomargin.vercel.app/sitemap.xml"
  }
}

// Get Homepage CMS
exports.getHomepageCMS = async (req, res) => {
  res.status(200).json({ success: true, data: cmsData.homepage })
}

// Update Homepage CMS
exports.updateHomepageCMS = async (req, res) => {
  cmsData.homepage = { ...cmsData.homepage, ...req.body }
  res.status(200).json({ success: true, message: 'Homepage CMS updated successfully', data: cmsData.homepage })
}

// Get About CMS
exports.getAboutCMS = async (req, res) => {
  res.status(200).json({ success: true, data: cmsData.about })
}

// Update About CMS
exports.updateAboutCMS = async (req, res) => {
  cmsData.about = { ...cmsData.about, ...req.body }
  res.status(200).json({ success: true, message: 'About CMS updated successfully', data: cmsData.about })
}

// Get Footer CMS
exports.getFooterCMS = async (req, res) => {
  res.status(200).json({ success: true, data: cmsData.footer })
}

// Update Footer CMS
exports.updateFooterCMS = async (req, res) => {
  cmsData.footer = { ...cmsData.footer, ...req.body }
  res.status(200).json({ success: true, message: 'Footer CMS updated successfully', data: cmsData.footer })
}

// Get SEO CMS
exports.getSEOCMS = async (req, res) => {
  res.status(200).json({ success: true, data: cmsData.seo })
}

// Update SEO CMS
exports.updateSEOCMS = async (req, res) => {
  cmsData.seo = { ...cmsData.seo, ...req.body }
  res.status(200).json({ success: true, message: 'SEO metadata updated successfully', data: cmsData.seo })
}

// Get Analytics Stats
exports.getAnalytics = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalVisitors: 45280,
      totalProducts: 14,
      totalProjects: 128,
      totalEnquiries: 850,
      todayLeads: 12,
      leadsByMonth: [
        { month: 'Jan', count: 45 },
        { month: 'Feb', count: 62 },
        { month: 'Mar', count: 78 },
        { month: 'Apr', count: 95 },
        { month: 'May', count: 110 },
        { month: 'Jun', count: 140 },
        { month: 'Jul', count: 185 },
        { month: 'Aug', count: 135 }
      ]
    }
  })
}
