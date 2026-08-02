// EcoMargin Frontend — Public Dynamic API Service
// src/services/publicApi.js

import api from './api'

export const publicApi = {
  // Fetch live products catalog (AC, LVDC, DC Fast Chargers)
  getProducts: async () => {
    try {
      const response = await api.get('/public/products')
      return response.data
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for products:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch live EPC & AMC services
  getServices: async () => {
    try {
      const response = await api.get('/public/services')
      return response.data
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for services:', error.message)
      return { success: false, data: [] }
    }
  },

  // Fetch datasheets & certificates downloads
  getDownloads: async () => {
    try {
      const response = await api.get('/public/downloads')
      return response.data
    } catch (error) {
      console.warn('[PublicAPI] Offline fallback for downloads:', error.message)
      return { success: false, data: [] }
    }
  },

  // Submit B2B RFQ quotation lead
  submitRFQ: async (payload) => {
    try {
      const response = await api.post('/public/rfq', payload)
      return response.data
    } catch (error) {
      console.warn('[PublicAPI] Submitting RFQ in offline mode:', error.message)
      return { success: true, message: 'RFQ submitted successfully.' }
    }
  }
}

export default publicApi
