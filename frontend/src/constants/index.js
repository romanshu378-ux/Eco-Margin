// EcoMargin — App Constants
// src/constants/index.js

// ── API Endpoints ─────────────────────────────────────────────
export const API_ROUTES = {
  AUTH: {
    LOGIN:          '/auth/login',
    REGISTER:       '/auth/register',
    LOGOUT:         '/auth/logout',
    ME:             '/auth/me',
    REFRESH:        '/auth/refresh',
    FORGOT:         '/auth/forgot-password',
    RESET:          '/auth/reset-password',
    VERIFY_EMAIL:   '/auth/verify-email',
  },
  STATIONS: {
    BASE:    '/stations',
    NEARBY:  '/stations/nearby',
    SEARCH:  '/stations/search',
  },
  BOOKINGS: {
    BASE:       '/bookings',
    MY:         '/bookings/my-bookings',
  },
  PAYMENTS: {
    CREATE:  '/payments/create-order',
    VERIFY:  '/payments/verify',
    HISTORY: '/payments/history',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE:  '/users/update',
  },
}

// ── App Routes ────────────────────────────────────────────────
export const APP_ROUTES = {
  HOME:           '/',
  ABOUT:          '/about',
  CONTACT:        '/contact',
  PRICING:        '/pricing',
  STATIONS:       '/stations',
  STATION_DETAIL: '/stations/:id',
  BOOKING:        '/booking/:stationId',
  BOOKING_CONFIRM:'/booking/confirm/:id',
  DASHBOARD:      '/dashboard',
  PROFILE:        '/profile',
  HISTORY:        '/history',
  WALLET:         '/wallet',
  LOGIN:          '/login',
  REGISTER:       '/register',
  FORGOT_PASSWORD:'/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND:      '*',
}

// ── Charger Types ─────────────────────────────────────────────
export const CHARGER_TYPES = [
  { value: 'AC',   label: 'AC Charging',   icon: '⚡' },
  { value: 'DC',   label: 'DC Fast Charge', icon: '🔋' },
  { value: 'FAST', label: 'Ultra Fast',     icon: '🚀' },
]

// ── Station Status ────────────────────────────────────────────
export const STATION_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED:  'occupied',
  OFFLINE:   'offline',
  MAINTENANCE:'maintenance',
}

// ── Booking Status ────────────────────────────────────────────
export const BOOKING_STATUS = {
  PENDING:    'pending',
  CONFIRMED:  'confirmed',
  IN_PROGRESS:'in_progress',
  COMPLETED:  'completed',
  CANCELLED:  'cancelled',
}

// ── User Roles ────────────────────────────────────────────────
export const USER_ROLES = {
  ADMIN:    'admin',
  OPERATOR: 'operator',
  USER:     'user',
}

// ── Pagination ────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10

// ── Local Storage Keys ────────────────────────────────────────
export const STORAGE_KEYS = {
  TOKEN:    'ecomargin_token',
  USER:     'ecomargin_user',
  THEME:    'ecomargin_theme',
}
