// EcoMargin — Utility Functions
// src/utils/index.js

// ── Formatting ────────────────────────────────────────────────

/** Format a number as Indian currency (₹) */
export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount)

/** Format a date string to a readable format */
export const formatDate = (date, options = {}) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', ...options,
  }).format(new Date(date))

/** Format duration in minutes to "Xh Ym" */
export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

/** Format distance in metres to "X.X km" */
export const formatDistance = (metres) =>
  metres >= 1000
    ? `${(metres / 1000).toFixed(1)} km`
    : `${metres} m`

// ── Validation ────────────────────────────────────────────────

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidPhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone)

export const isValidPassword = (password) =>
  password.length >= 8

// ── String Helpers ────────────────────────────────────────────

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''

export const truncate = (str, maxLength = 100) =>
  str?.length > maxLength ? `${str.substring(0, maxLength)}...` : str

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

// ── Storage Helpers ───────────────────────────────────────────

export const getFromStorage = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) }
  catch { return null }
}

export const setToStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) }
  catch { /* ignore quota errors */ }
}

export const removeFromStorage = (key) => localStorage.removeItem(key)

// ── Geolocation ───────────────────────────────────────────────

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
      (err) => reject(err),
      { timeout: 10000, enableHighAccuracy: true },
    )
  })

// ── Debounce ──────────────────────────────────────────────────

export const debounce = (fn, delay = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ── Class Names ───────────────────────────────────────────────

export const cn = (...classes) => classes.filter(Boolean).join(' ')
