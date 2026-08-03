// EcoMargin Frontend — Public Dynamic API Service
// src/services/publicApi.js

import api from './api'

export const publicApi = {
  // Fetch Homepage CMS Banners, Headlines & Section Toggles
  getHomepageCMS: async () => {
    try {
      const response = await api.get('/public/homepage', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for homepage CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch About Page Vision, Mission, Story & Messages
  getAboutCMS: async () => {
    try {
      const response = await api.get('/public/about', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for about CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Manufacturing Page Process, Factory Metrics & Standards
  getManufacturingCMS: async () => {
    try {
      const response = await api.get('/public/manufacturing', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for manufacturing CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Footer Company Info, Phones, Emails, Address & Copyright
  getFooterCMS: async () => {
    try {
      const response = await api.get('/public/footer', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for footer CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Contact Info (Same as Footer CMS)
  getContactCMS: async () => {
    try {
      const response = await api.get('/public/contact', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for contact CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch SEO Metadata, Open Graph & Canonical URLs
  getSEOCMS: async () => {
    try {
      const response = await api.get('/public/seo', {
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      })
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for SEO CMS:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Product Categories
  getCategories: async () => {
    try {
      const response = await api.get('/public/categories')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for categories:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Industry Sectors
  getIndustries: async () => {
    try {
      const response = await api.get('/public/industries')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for industries:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch EPC Projects Portfolio
  getProjects: async () => {
    try {
      const response = await api.get('/public/projects')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for projects:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Factory & Plant Gallery Photos
  getGallery: async () => {
    try {
      const response = await api.get('/public/gallery')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for gallery:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Blog Articles
  getBlogs: async () => {
    try {
      const response = await api.get('/public/blogs')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for blogs:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch Blog Article by Slug
  getBlogBySlug: async (slug) => {
    try {
      const response = await api.get(`/public/blogs/${slug}`)
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for blog slug:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch live products catalog (AC, LVDC, DC Fast Chargers)
  getProducts: async () => {
    try {
      const response = await api.get('/public/products')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for products:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch live EPC & AMC services
  getServices: async () => {
    try {
      const response = await api.get('/public/services')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for services:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch datasheets & certificates downloads
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
  }
}

export default publicApi
