// EcoMargin Admin Panel — Admin Domain API Service
// admin-panel/src/services/adminService.js

import api from './api';

export const adminService = {
  // Real-Time Dashboard & Analytics
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getDashboardAnalytics: () => api.get('/admin/dashboard/analytics'),
  getDashboardActivities: () => api.get('/admin/dashboard/activities'),

  getUsers: () => api.get('/admin/users'),
  getStations: () => api.get('/admin/stations'),
  getProducts: () => api.get('/admin/products'),
  getContactSubmissions: () => api.get('/admin/leads'),
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

  // Product Categories CRUD
  getCategories: () => api.get('/admin/categories'),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),

  // Industries & Sectors CRUD
  getIndustries: () => api.get('/admin/industries'),
  createIndustry: (data) => api.post('/admin/industries', data),
  updateIndustry: (id, data) => api.put(`/admin/industries/${id}`, data),
  deleteIndustry: (id) => api.delete(`/admin/industries/${id}`),

  // EPC Projects Portfolio CRUD
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Factory & Plant Gallery CRUD
  getGallery: () => api.get('/admin/gallery'),
  createGallery: (data) => api.post('/admin/gallery', data),
  updateGallery: (id, data) => api.put(`/admin/gallery/${id}`, data),
  deleteGallery: (id) => api.delete(`/admin/gallery/${id}`),

  // Whitepapers & Blogs CRUD
  getBlogs: () => api.get('/admin/blogs'),
  createBlog: (data) => api.post('/admin/blogs', data),
  updateBlog: (id, data) => api.put(`/admin/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),

  // Enquiries & Leads Management CRUD
  getLeads: (params) => api.get('/admin/leads', { params }),
  createLead: (data) => api.post('/admin/leads', data),
  updateLead: (id, data) => api.put(`/admin/leads/${id}`, data),
  updateLeadStatus: (id, status) => api.patch(`/admin/leads/${id}/status`, { status }),
  deleteLead: (id) => api.delete(`/admin/leads/${id}`),

  // Email Service APIs
  sendCustomEmail: (data) => api.post('/email/send', data),
  getEmailHistory: (leadId) => api.get(`/email/history/${leadId}`),

  // CRM Quotation APIs
  generateQuotation: (data) => api.post('/crm/quotations', data),
  getQuotations: (leadId) => api.get(`/crm/quotations/lead/${leadId}`),
  emailQuotation: (id) => api.post(`/crm/quotations/${id}/email`),

  // CRM Lead Notes & Timeline
  addLeadNote: (data) => api.post('/crm/notes', data),
  getLeadNotes: (leadId) => api.get(`/crm/notes/lead/${leadId}`),
  getLeadTimeline: (leadId) => api.get(`/crm/timeline/lead/${leadId}`),

  // CRM Notifications
  getNotifications: () => api.get('/crm/notifications'),
  markNotificationRead: (id) => api.put(`/crm/notifications/${id}/read`),

  // Dealer Applications Management CRUD
  getDealers: () => api.get('/admin/dealer-applications'),
  updateDealerStatus: (id, data) => api.put(`/admin/dealer-applications/${id}`, data),
  deleteDealer: (id) => api.delete(`/admin/dealer-applications/${id}`),

  // Newsletter Subscribers Management CRUD
  getNewsletters: () => api.get('/admin/newsletters'),
  deleteNewsletter: (id) => api.delete(`/admin/newsletters/${id}`),

  // Website Global System Settings CRUD
  getSettings: () => api.get('/admin/settings'),
  createSetting: (data) => api.post('/admin/settings', data),
  updateSetting: (id, data) => api.put(`/admin/settings/${id}`, data),
  deleteSetting: (id) => api.delete(`/admin/settings/${id}`),

  // Website Logo Manager CRUD
  getLogos: () => api.get('/admin/logo'),
  uploadLogo: (formData) => api.post('/admin/logo/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  saveLogoUrl: (data) => api.post('/admin/logo/url', data),
  updateLogo: (id, data) => api.put(`/admin/logo/${id}`, data),
  deleteLogo: (id) => api.delete(`/admin/logo/${id}`),

  // Media File Upload / Cloudinary Integration
  uploadMedia: (formData) => api.post('/admin/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMedia: (publicId) => api.delete(`/admin/media/${publicId}`)
};

export default adminService;
