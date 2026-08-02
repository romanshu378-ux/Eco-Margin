// EcoMargin Admin Panel — Admin Domain API Service
// admin-panel/src/services/adminService.js

import api from './api';

export const adminService = {
  // Read Endpoints
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  getStations: () => api.get('/admin/stations'),
  getProducts: () => api.get('/admin/products'),
  getCategories: () => api.get('/admin/categories'),
  getBlogs: () => api.get('/admin/blogs'),
  getGallery: () => api.get('/admin/gallery'),
  getProjects: () => api.get('/admin/projects'),
  getContactSubmissions: () => api.get('/admin/contact'),
  getNewsletterSubscribers: () => api.get('/admin/newsletter'),
  getSettings: () => api.get('/admin/settings'),
  getSEOConfigs: () => api.get('/admin/seo'),
  getMediaFiles: () => api.get('/admin/media'),

  // CMS GET Endpoints
  getHomepageCMS: () => api.get('/cms/homepage'),
  getAboutCMS: () => api.get('/cms/about'),
  getManufacturingCMS: () => api.get('/cms/manufacturing'),
  getFooterCMS: () => api.get('/cms/footer'),
  getSEOCMS: () => api.get('/cms/seo'),

  // CMS Mutation Endpoints (Save/Update)
  updateHomepageCMS: (data) => api.put('/cms/homepage', data),
  updateAboutCMS: (data) => api.put('/cms/about', data),
  updateManufacturingCMS: (data) => api.put('/cms/manufacturing', data),
  updateFooterCMS: (data) => api.put('/cms/footer', data),
  updateSEOCMS: (data) => api.put('/cms/seo', data),

  // Product Catalog Mutations
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Downloads Mutations
  createDownload: (data) => api.post('/admin/downloads', data),
  deleteDownload: (id) => api.delete(`/admin/downloads/${id}`),
};

export default adminService;
