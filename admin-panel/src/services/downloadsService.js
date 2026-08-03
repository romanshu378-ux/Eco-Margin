// EcoMargin Admin Panel — Downloads & Certificates API Service
// src/services/downloadsService.js

import api from './api';

export const downloadsService = {
  getDownloads: () => api.get('/admin/downloads'),
  getDownloadById: (id) => api.get(`/admin/downloads/${id}`),
  createDownload: (data) => api.post('/admin/downloads', data),
  updateDownload: (id, data) => api.put(`/admin/downloads/${id}`, data),
  deleteDownload: (id) => api.delete(`/admin/downloads/${id}`),
  uploadPdf: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default downloadsService;
