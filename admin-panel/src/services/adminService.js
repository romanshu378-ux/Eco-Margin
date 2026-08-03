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

  // Blogs & Insights CRUD
  getBlogs: () => api.get('/admin/blogs'),
  createBlog: (data) => api.post('/admin/blogs', data),
  updateBlog: (id, data) => api.put(`/admin/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),

  // Downloads CRUD
  getDownloads: () => api.get('/admin/downloads'),
  createDownload: (data) => api.post('/admin/downloads', data),
  updateDownload: (id, data) => api.put(`/admin/downloads/${id}`, data),
  deleteDownload: (id) => api.delete(`/admin/downloads/${id}`),

  // RFQ Enquiries & Lead Management CRUD
  getLeads: (params) => api.get('/admin/leads', { params }),
  getLeadById: (id) => api.get(`/admin/leads/${id}`),
  createLead: (data) => api.post('/leads', data),
  updateLead: (id, data) => api.put(`/admin/leads/${id}`, data),
  updateLeadStatus: (id, status) => api.patch(`/admin/leads/${id}/status`, { status }),
  deleteLead: (id) => api.delete(`/admin/leads/${id}`),

  // Dealer Partner Applications CRUD
  getDealerApplications: (params) => api.get('/admin/dealer-applications', { params }),
  getDealerById: (id) => api.get(`/admin/dealer-applications/${id}`),
  createDealer: (data) => api.post('/dealer-applications', data),
  updateDealer: (id, data) => api.put(`/admin/dealer-applications/${id}`, data),
  updateDealerStatus: (id, status) => api.patch(`/admin/dealer-applications/${id}/status`, { status }),
  deleteDealer: (id) => api.delete(`/admin/dealer-applications/${id}`),
  bulkDeleteDealers: (ids) => api.post('/admin/dealer-applications/bulk-delete', { ids }),

  // Newsletter Subscribers CRUD
  getNewsletters: (params) => api.get('/admin/newsletter', { params }),
  subscribeNewsletter: (data) => api.post('/newsletters', data),
  deleteNewsletter: (id) => api.delete(`/admin/newsletter/${id}`),
  bulkDeleteNewsletters: (ids) => api.post('/admin/newsletter/bulk-delete', { ids }),

  // Cloudinary Media Upload
  uploadMedia: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadPdf: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default adminService;
