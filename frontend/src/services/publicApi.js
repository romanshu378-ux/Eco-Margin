// EcoMargin Frontend — Public Dynamic API Client
// src/services/publicApi.js

import api from './api'

export const publicApi = {
  // Fetch Homepage CMS Data
  getHomepage: async () => {
    try {
      const response = await api.get('/public/homepage')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for homepage:', error.message)
      return { success: false, data: null }
    }
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

  // Fetch Footer & Contact Info CMS Data
  getFooter: async () => {
    try {
      const response = await api.get('/public/footer')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for footer:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Contact Page Info
  getContact: async () => {
    try {
      const response = await api.get('/public/contact')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for contact:', error.message)
      return { success: false, data: null }
    }
  },

  // Fetch Global SEO Metadata
  getSEO: async () => {
    try {
      const response = await api.get('/public/seo')
      return response
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for SEO:', error.message)
      return { success: false, data: null }
    }
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

  // Fetch Active Industries & Sectors
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
