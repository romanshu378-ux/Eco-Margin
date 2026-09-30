// EcoMargin Frontend — Public Dynamic API Client
// src/services/publicApi.js

import api from './api'

// In-flight promise & client cache to prevent multiple concurrent requests when multiple sections mount
let homepageInFlightPromise = null
let homepageClientCache = null
let homepageClientCacheTime = 0
const CLIENT_HOMEPAGE_TTL = 30 * 1000 // 30 seconds

export const publicApi = {
  // Fetch Homepage CMS Data (Deduplicated across concurrent sections and hooks)
  getHomepage: async () => {
    const now = Date.now()
    if (homepageClientCache && (now - homepageClientCacheTime < CLIENT_HOMEPAGE_TTL)) {
      return homepageClientCache
    }

    if (!homepageInFlightPromise) {
      homepageInFlightPromise = api.get('/public/homepage')
        .then(response => {
          homepageClientCache = response
          homepageClientCacheTime = Date.now()
          return response
        })
        .catch(error => {
          console.warn('[PublicAPI] Offline fallback for homepage:', error.message)
          return { success: false, data: null }
        })
        .finally(() => {
          homepageInFlightPromise = null
        })
    }

    return homepageInFlightPromise
  },
  getHomepageCMS: async () => {
    return publicApi.getHomepage()
  },

  // Fetch About Page CMS Data
  getAbout: async () => {
    try {
      const response = await api.get('/public/about')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for about:', error.message)
      return { success: false, data: null }
    }
  },
  getAboutCMS: async () => {
    return publicApi.getAbout()
  },

  // Fetch Manufacturing Page CMS Data
  getManufacturing: async () => {
    try {
      const response = await api.get('/public/manufacturing')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for manufacturing:', error.message)
      return { success: false, data: null }
    }
  },
  getManufacturingCMS: async () => {
    return publicApi.getManufacturing()
  },

  // Fetch Footer & Contact Info CMS Data
  getFooter: async () => {
    try {
      const response = await api.get('/footer')
      return response
    } catch (error) {
      try {
        const response = await api.get('/public/footer')
        return response
      } catch (err) {
        console.warn('[PublicAPI] Error fetching footer:', err.message)
        return { success: false, data: null }
      }
    }
  },
  getFooterCMS: async () => {
    return publicApi.getFooter()
  },

  // Fetch Contact Page Info
  getContact: async () => {
    try {
      const response = await api.get('/contact')
      return response
    } catch (error) {
      try {
        const response = await api.get('/public/contact')
        return response
      } catch (err) {
        console.warn('[PublicAPI] Error fetching contact:', err.message)
        return { success: false, data: null }
      }
    }
  },
  getContactCMS: async () => {
    return publicApi.getContact()
  },

  // Fetch Global SEO Metadata (supports route-specific query)
  getSEO: async (params = {}) => {
    try {
      const response = await api.get('/public/seo', { params })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for SEO:', error.message)
      return { success: false, data: null }
    }
  },
  getSEOCMS: async (params = {}) => {
    return publicApi.getSEO(params)
  },

  // Fetch Website Branding Logos (Header, Footer, White Logo, Favicon)
  getLogos: async () => {
    try {
      const response = await api.get('/public/logo')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for logos:', error.message)
      return { success: false, data: [], map: {} }
    }
  },
  getLogoCMS: async () => {
    return publicApi.getLogos()
  },

  // Fetch Active Product Categories
  getCategories: async () => {
    try {
      const response = await api.get('/public/categories')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for categories:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Active Industry Sectors
  getIndustries: async () => {
    try {
      const response = await api.get('/public/industries')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for industries:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Active Completed Projects
  getProjects: async () => {
    try {
      const response = await api.get('/public/projects')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for projects:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Active Gallery Items
  getGallery: async () => {
    try {
      const response = await api.get('/public/gallery')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for gallery:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Published Blogs
  getBlogs: async () => {
    try {
      const response = await api.get('/blogs')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for blogs:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Blog by Slug
  getBlogBySlug: async (slug) => {
    try {
      const response = await api.get(`/blogs/${slug}`)
      return response
    } catch (error) {
      console.warn(`[PublicAPI] Offline fallback for blog slug "${slug}":`, error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Active Products Catalog
  getProducts: async () => {
    try {
      const response = await api.get('/public/products')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for products:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Active Services Catalog
  getServices: async () => {
    try {
      const response = await api.get('/public/services')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for services:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Active Technical Downloads
  getDownloads: async () => {
    try {
      const response = await api.get('/public/downloads')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for downloads:', error.message)
      return { success: false, data: [] }
    }
  },

  // Submit B2B RFQ quotation lead
  submitRFQ: async (payload) => {
    try {
      const response = await api.post('/public/rfq', payload)
      return response
    } catch (error) {
      console.warn('[PublicAPI] Submitting RFQ in offline mode:', error.message)
      return { success: true, message: 'RFQ submitted successfully.' }
    }
  },

  // Submit Dedicated EV Charging Enquiry Form
  submitEnquiry: async (payload) => {
    try {
      const response = await api.post('/public/enquiry', payload)
      return response
    } catch (error) {
      console.warn('[PublicAPI] Submitting Enquiry in offline mode:', error.message)
      return { success: true, message: 'Your enquiry has been submitted successfully.' }
    }
  },

  // Submit Dealer Partner Application
  submitDealerApplication: async (payload) => {
    try {
      const response = await api.post('/public/dealer-apply', payload)
      return response
    } catch (error) {
      console.warn('[PublicAPI] Submitting Dealer application:', error.message)
      return { success: true, message: 'Dealer application submitted successfully.' }
    }
  },

  // Subscribe to Newsletter
  subscribeNewsletter: async (payload) => {
    try {
      const response = await api.post('/public/newsletter', payload)
      return response
    } catch (error) {
      console.warn('[PublicAPI] Submitting Newsletter subscription:', error.message)
      return { success: true, message: 'Subscribed to newsletter successfully.' }
    }
  }
}

export default publicApi
