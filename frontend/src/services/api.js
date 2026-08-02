// EcoMargin — Axios API Service
// src/services/api.js

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Request Interceptor — attach JWT ──────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecomargin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── Response Interceptor — handle errors & 401 ─────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
    
    if (status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('ecomargin_token')
      window.location.href = '/login'
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data
    })
  },
)

export default api
