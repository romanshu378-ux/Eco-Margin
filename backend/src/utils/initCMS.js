// EcoMargin — CMS Initializer (Only Creates Defaults If Table Is Empty)
// src/utils/initCMS.js
'use strict'

const { 
  Homepage, About, Manufacturing, Footer, SEO, Download, 
  Category, Industry, Project, Gallery, Blog, Lead, 
  DealerApplication, Newsletter, ActivityLog 
} = require('../models')
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
    { title: '1. In-House SMT & PCB Assembly', description: 'Automated surface mount lines assemble main controller boards, power metering units, and safety protection circuits under Class 100,000 cleanroom standards.' },
    { title: '2. Enclosure Fabrication & IP Rating', description: 'Heavy-duty Galvanized Steel and Stainless Steel outer cabinets coated with anti-corrosive outdoor UV powder coating (IP55/IP65 Outdoor Rated).' },
    { title: '3. Full Power Burn-in Testing', description: '100% of manufactured chargers undergo a 48-hour continuous full-load endurance test in environmental thermal chambers.' },
    { title: '4. ARAI & CE Safety Inspection', description: 'Rigorous insulation resistance, earth continuity, high-voltage withstand, surge suppression, and ground fault circuit breaker verification.' },
    { title: '5. Firmware & OCPP Protocol Validation', description: 'Automated software simulation testing compatibility across 50+ EV models and OCPP 1.6J/2.0.1 central management systems.' },
    { title: '6. Quality Dispatch & Logistics', description: 'Sealed shockproof packaging with complete test calibration reports, installation manuals, and warranty documentation.' }
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

const defaultCategories = [
  { name: 'AC EV Chargers', slug: 'ac-ev-chargers', description: 'Wallbox and pedestal AC chargers from 3.3kW to 22kW for home, workplace, and commercial parking.', displayOrder: 1, status: 'Active' },
  { name: 'LVDC Chargers', slug: 'lvdc-chargers', description: 'Low Voltage DC chargers (48V–96V DC) engineered for electric 2W/3W fleets and light commercial vehicles.', displayOrder: 2, status: 'Active' },
  { name: 'DC Fast Chargers', slug: 'dc-fast-chargers', description: 'High-power commercial DC fast chargers (30kW to 240kW) with dual CCS2 guns for express highways and bus depots.', displayOrder: 3, status: 'Active' },
  { name: 'OCPP Software & CSMS', slug: 'ocpp-software', description: 'Central Management System software supporting OCPP 1.6J / 2.0.1, automated billing, RFID access, and NOC monitoring.', displayOrder: 4, status: 'Active' }
]

const defaultIndustries = [
  { name: 'Express Highways & Fuel Pumps', icon: '🛣️', description: 'Ultra-fast DC charging hubs for long-distance EV travel and high-throughput highway plazas.', displayOrder: 1, status: 'Active' },
  { name: 'Commercial Fleets & Logistics', icon: '🚚', description: 'Dedicated fast charging infrastructure for 2W, 3W, and 4W e-commerce and delivery fleets.', displayOrder: 2, status: 'Active' },
  { name: 'E-Bus & Transport Depots', icon: '🚌', description: 'Heavy-duty 240kW pantograph & dual CCS2 DC chargers for public transit and municipal bus fleets.', displayOrder: 3, status: 'Active' },
  { name: 'Hotels & Hospitality', icon: '🏨', description: 'Premium destination AC charging wallboxes for luxury guest amenities and hotel fleets.', displayOrder: 4, status: 'Active' },
  { name: 'Residential & Gated Communities', icon: '🏢', description: 'Shared AC chargers with individual RFID access and automated mobile billing.', displayOrder: 5, status: 'Active' },
  { name: 'Government & Smart Cities', icon: '🏛️', description: 'Turnkey EPC charging station deployment for public smart city initiatives.', displayOrder: 6, status: 'Active' }
]

const defaultProjects = [
  { title: 'Delhi-Jaipur EV Superhighway Corridor', clientName: 'National Highway Logistics Management', location: 'NH-48 Corridor', capacity: '120kW Dual CCS2', timeline: 'Completed 2025', description: 'Turnkey EPC installation of 12 ultra-fast DC charging stations spanning 270 km along NH-48.', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', displayOrder: 1, status: 'Completed' },
  { title: 'Noida Metro Feeder E-Bus Depot', clientName: 'Delhi Metro Rail Corporation (DMRC)', location: 'Sector 51, Noida', capacity: '240kW High Power DC', timeline: 'Completed 2025', description: 'Heavy-duty DC charging infrastructure powering 50+ electric feeder buses with 99.8% uptime SLA.', imageUrl: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80', displayOrder: 2, status: 'Completed' },
  { title: 'Gurugram Commercial Logistics Hub', clientName: 'Bluedart Logistics', location: 'Cyber City, Gurugram', capacity: '30kW LVDC & 60kW DC', timeline: 'Completed 2026', description: 'Overnight & fast charging facility for 100+ electric delivery vans operating 24/7.', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', displayOrder: 3, status: 'Completed' }
]

const defaultGallery = [
  { title: 'Automated SMT PCB Controller Assembly Line', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', displayOrder: 1, status: 'Active' },
  { title: 'Heavy-Duty IP55 Galvanized Steel Enclosure Fabrication', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80', displayOrder: 2, status: 'Active' },
  { title: '48-Hour Full-Load Burn-in Thermal Test Chamber', category: 'Testing & Quality', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', displayOrder: 3, status: 'Active' },
  { title: '60kW & 120kW Dual CCS2 DC Fast Charger Quality Assembly', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', displayOrder: 4, status: 'Active' }
]

const defaultBlogs = [
  { title: 'Understanding ARAI AIS-138 Certification for Indian EV Chargers', slug: 'arai-ais-138-certification-ev-chargers', author: 'Dr. R. K. Sharma (CTO)', summary: 'A comprehensive technical overview of grid safety, surge suppression, and insulation testing mandated under AIS-138 Part 1 & 2 standards.', content: '<p>Grid stability and environmental weatherproofing are critical engineering challenges for EV charger manufacturers in India. Under the AIS-138 Part 1 & 2 standard guidelines...</p>', coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', displayOrder: 1, status: 'Published' },
  { title: 'Why Thermal Management & IP55 Enclosures Matter in 50°C Summers', slug: 'thermal-management-ip55-enclosures-ev-chargers', author: 'EcoMargin R&D Team', summary: 'How active liquid cooling and wide voltage tolerance prevent thermal throttling during peak Indian summer ambient temperatures.', content: '<p>High ambient heat combined with dust ingress significantly reduces the efficiency and lifespan of power electronic converters if proper thermal dissipation systems are absent...</p>', coverImage: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80', displayOrder: 2, status: 'Published' }
]

const defaultLeads = [
  { fullName: 'Alice Johnson', email: 'alice@corp.com', phone: '+91 98765 43210', company: 'Nexus Logistics Pvt Ltd', subject: '60kW DC Fast Charger Inquiry', message: 'We are looking to set up 5 fast charging hubs across Mumbai.', status: 'New', notes: 'Initial RFQ submission from web modal.' },
  { fullName: 'Bob Williams', email: 'bob@tech.io', phone: '+91 98123 45678', company: 'Apex Real Estate', subject: '22kW Dual Gun AC Chargers for Hotel', message: 'Requirement for 10 dual gun AC chargers in Gurgaon.', status: 'In Progress', notes: 'Sales manager contacted client on phone.' },
  { fullName: 'Chiraag Patel', email: 'chiraag@fleet.in', phone: '+91 97766 55443', company: 'Patel Transports', subject: '240kW Heavy Duty Depot Charger', message: 'E-bus fleet charging setup inquiry for 20 buses.', status: 'Replied', notes: 'Sent technical proposal and quotation via email.' },
  { fullName: 'Deepika Rao', email: 'deepika@smartcity.gov.in', phone: '+91 91122 33445', company: 'Smart City Mission', subject: 'Turnkey EPC Installation Project', message: 'Government tender enquiry for municipal EV charging plinths.', status: 'Closed', notes: 'Tender submitted successfully.' }
]

const defaultDealers = [
  { fullName: 'Vikram Mehta', companyName: 'Mehta Electricals & Power Ltd', email: 'vikram@mehtaelectricals.com', phone: '+91 98200 11223', city: 'Pune', state: 'Maharashtra', experience: '12 Years in Electrical Equipment Distribution', investmentCapacity: '₹50 Lakhs - ₹1 Crore', message: 'Interested in becoming master distributor for EcoMargin DC Fast Chargers in Maharashtra.', status: 'New', notes: 'Reviewing company profile & GST verification.' },
  { fullName: 'Suresh Menon', companyName: 'GreenMobility Solutions', email: 'suresh@greenmobility.in', phone: '+91 94470 55667', city: 'Kochi', state: 'Kerala', experience: '5 Years in EV Charging Station Setup', investmentCapacity: '₹25 Lakhs - ₹50 Lakhs', message: 'We want to set up authorized service & dealership center in Ernakulam.', status: 'In Review', notes: 'Initial phone conversation completed.' }
]

const defaultNewsletters = [
  { email: 'fleet.manager@delhifreight.com', status: 'Subscribed' },
  { email: 'energy.director@infra-build.co.in', status: 'Subscribed' },
  { email: 'procurement@green-logistics.org', status: 'Subscribed' }
]

const defaultActivities = [
  { action: 'New Contact Form Submitted', type: 'Enquiry', description: 'Lead received from Alice Johnson (Nexus Logistics Pvt Ltd)', ipAddress: '127.0.0.1' },
  { action: 'New RFQ Quotation Submitted', type: 'RFQ', description: '60kW Dual Gun DC Charger Quote Request from Bob Williams', ipAddress: '127.0.0.1' },
  { action: 'Dealer Application Received', type: 'Dealer', description: 'Application from Vikram Mehta (Mehta Electricals & Power Ltd)', ipAddress: '127.0.0.1' },
  { action: 'Gallery Image Uploaded', type: 'CMS', description: 'Added "Automated SMT PCB Controller Assembly Line" to Factory Gallery', ipAddress: '127.0.0.1' },
  { action: 'Blog Article Published', type: 'Blog', description: 'Published whitepaper "Understanding ARAI AIS-138 Certification"', ipAddress: '127.0.0.1' }
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
    }

    const aboutCount = await About.count()
    if (aboutCount === 0) {
      await About.create(defaultAbout)
      logger.info('🌱 Created default About CMS record (table was empty)')
    }

    const mfgCount = await Manufacturing.count()
    if (mfgCount === 0) {
      await Manufacturing.create(defaultManufacturing)
      logger.info('🌱 Created default Manufacturing CMS record (table was empty)')
    }

    const footerCount = await Footer.count()
    if (footerCount === 0) {
      await Footer.create(defaultFooter)
      logger.info('🌱 Created default Footer CMS record (table was empty)')
    }

    const seoCount = await SEO.count()
    if (seoCount === 0) {
      await SEO.create(defaultSEO)
      logger.info('🌱 Created default SEO CMS record (table was empty)')
    }

    const downloadCount = await Download.count()
    if (downloadCount === 0) {
      await Download.bulkCreate(defaultDownloads)
      logger.info('🌱 Created default Downloads CMS records (table was empty)')
    }

    const categoryCount = await Category.count()
    if (categoryCount === 0) {
      await Category.bulkCreate(defaultCategories)
      logger.info('🌱 Created default Category CMS records (table was empty)')
    }

    const industryCount = await Industry.count()
    if (industryCount === 0) {
      await Industry.bulkCreate(defaultIndustries)
      logger.info('🌱 Created default Industry CMS records (table was empty)')
    }

    const projectCount = await Project.count()
    if (projectCount === 0) {
      await Project.bulkCreate(defaultProjects)
      logger.info('🌱 Created default Project CMS records (table was empty)')
    }

    const galleryCount = await Gallery.count()
    if (galleryCount === 0) {
      await Gallery.bulkCreate(defaultGallery)
      logger.info('🌱 Created default Gallery CMS records (table was empty)')
    }

    const blogCount = await Blog.count()
    if (blogCount === 0) {
      await Blog.bulkCreate(defaultBlogs)
      logger.info('🌱 Created default Blog CMS records (table was empty)')
    }

    const leadCount = await Lead.count()
    if (leadCount === 0) {
      await Lead.bulkCreate(defaultLeads)
      logger.info('🌱 Created default Lead records (table was empty)')
    }

    const dealerCount = await DealerApplication.count()
    if (dealerCount === 0) {
      await DealerApplication.bulkCreate(defaultDealers)
      logger.info('🌱 Created default Dealer Application records (table was empty)')
    }

    const newsletterCount = await Newsletter.count()
    if (newsletterCount === 0) {
      await Newsletter.bulkCreate(defaultNewsletters)
      logger.info('🌱 Created default Newsletter subscriber records (table was empty)')
    }

    const activityCount = await ActivityLog.count()
    if (activityCount === 0) {
      await ActivityLog.bulkCreate(defaultActivities)
      logger.info('🌱 Created initial Activity Log records (table was empty)')
    }
  } catch (error) {
    logger.error('❌ Error initializing CMS defaults:', error)
  }
}

module.exports = { initCMSDefaults }
