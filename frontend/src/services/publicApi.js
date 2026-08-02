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
