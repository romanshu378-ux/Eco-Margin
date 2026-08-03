// EcoMargin — CMS Initializer (Only Creates Defaults If Table Is Empty)
// src/utils/initCMS.js
'use strict'

const { Homepage, About, Manufacturing, Footer, SEO, Download } = require('../models')
const logger = require('../config/logger')

const defaultHomepage = {
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
}

const defaultAbout = {
  vision: "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware.",
  mission: "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions.",
  story: "Founded in 2020, EcoMargin has grown into a leading OEM charger manufacturer and EPC contractor operating a 50,000 sq.ft. certified facility in Noida, India.",
  directorMessage: "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring."
}

const defaultManufacturing = {
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
}

const defaultFooter = {
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
}

const defaultSEO = {
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

const defaultDownloads = [
  { name: 'EcoWall 7.4kW AC Single Phase Charger Specification Sheet', category: 'Technical Datasheet', fileSize: '1.2 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/7.4kW-AC.pdf', displayOrder: 1, status: 'Active' },
  { name: 'EcoWall 22kW Dual Gun AC Charger Spec & CAD Drawing', category: 'Technical Datasheet', fileSize: '1.8 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/22kW-AC.pdf', displayOrder: 2, status: 'Active' },
  { name: 'EcoCharge 30kW DC Fast Charger Technical Manual', category: 'Technical Datasheet', fileSize: '2.5 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/30kW-DC.pdf', displayOrder: 3, status: 'Active' },
  { name: 'EcoCharge 60kW Dual CCS2 DC Charger Brochure', category: 'Technical Datasheet', fileSize: '3.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/60kW-DC.pdf', displayOrder: 4, status: 'Active' },
  { name: 'ARAI Test Compliance Certificate (AIS 138 Part 1 & 2)', category: 'Certificates', fileSize: '2.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/arai-ais138.pdf', displayOrder: 5, status: 'Active' },
  { name: 'ISO 9001:2015 Quality Management System Certificate', category: 'Certificates', fileSize: '1.4 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/iso9001.pdf', displayOrder: 6, status: 'Active' },
  { name: 'CE Mark Electrical Safety Test Declaration', category: 'Certificates', fileSize: '1.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/ce-mark.pdf', displayOrder: 7, status: 'Active' }
]

/**
 * Initializes default CMS content ONLY IF tables are completely empty.
 * If any record already exists, it is left untouched.
 */
async function initCMSDefaults() {
  try {
    const homepageCount = await Homepage.count()
    if (homepageCount === 0) {
      await Homepage.create(defaultHomepage)
      logger.info('🌱 Created default Homepage CMS record (table was empty)')
    } else {
      logger.info('🔒 Homepage CMS data exists in database. Skipped default seeding.')
    }

    const aboutCount = await About.count()
    if (aboutCount === 0) {
      await About.create(defaultAbout)
      logger.info('🌱 Created default About CMS record (table was empty)')
    } else {
      logger.info('🔒 About CMS data exists in database. Skipped default seeding.')
    }

    const mfgCount = await Manufacturing.count()
    if (mfgCount === 0) {
      await Manufacturing.create(defaultManufacturing)
      logger.info('🌱 Created default Manufacturing CMS record (table was empty)')
    } else {
      logger.info('🔒 Manufacturing CMS data exists in database. Skipped default seeding.')
    }

    const footerCount = await Footer.count()
    if (footerCount === 0) {
      await Footer.create(defaultFooter)
      logger.info('🌱 Created default Footer CMS record (table was empty)')
    } else {
      logger.info('🔒 Footer CMS data exists in database. Skipped default seeding.')
    }

    const seoCount = await SEO.count()
    if (seoCount === 0) {
      await SEO.create(defaultSEO)
      logger.info('🌱 Created default SEO CMS record (table was empty)')
    } else {
      logger.info('🔒 SEO CMS data exists in database. Skipped default seeding.')
    }

    const downloadCount = await Download.count()
    if (downloadCount === 0) {
      await Download.bulkCreate(defaultDownloads)
      logger.info('🌱 Created default Downloads CMS records (table was empty)')
    } else {
      logger.info('🔒 Downloads CMS data exists in database. Skipped default seeding.')
    }
  } catch (error) {
    logger.error('❌ Error initializing CMS defaults:', error)
  }
}

module.exports = { initCMSDefaults }
