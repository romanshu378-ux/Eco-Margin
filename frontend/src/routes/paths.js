export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  SOLUTIONS: '/solutions',
  SERVICES: '/services',
  PROJECTS: '/projects',
  GALLERY: '/gallery',
  BLOGS: '/blogs',
  CAREER: '/career',
  CONTACT: '/contact',
  
  // Legal
  PRIVACY: '/privacy-policy',
  TERMS: '/terms',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // App
  STATIONS: '/stations',
  STATION_DETAIL: (id) => `/stations/${id}`,
  
  // Protected
  DASHBOARD: '/dashboard',
  BOOKINGS: '/dashboard/bookings',
  WALLET: '/dashboard/wallet',
  PROFILE: '/dashboard/profile',
  
  // 404
  NOT_FOUND: '*'
}
