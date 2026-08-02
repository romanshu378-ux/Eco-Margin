// EcoMargin Admin Panel — Admin Domain Service
// admin-panel/src/services/adminService.js

import api from './api';

export const adminService = {
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
};
