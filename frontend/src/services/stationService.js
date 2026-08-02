// EcoMargin — Station Service
// src/services/stationService.js
import api from './api'

export const stationService = {
  getAll:      (params) => api.get('/stations', { params }),
  getById:     (id)     => api.get(`/stations/${id}`),
  getNearby:   (params) => api.get('/stations/nearby', { params }),
  getReviews:  (id)     => api.get(`/stations/${id}/reviews`),
  search:      (query)  => api.get('/stations/search', { params: { q: query } }),
}
