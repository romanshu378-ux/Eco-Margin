// EcoMargin — Booking Service
// src/services/bookingService.js
import api from './api'

export const bookingService = {
  create:    (data)   => api.post('/bookings', data),
  getAll:    (params) => api.get('/bookings', { params }),
  getById:   (id)     => api.get(`/bookings/${id}`),
  cancel:    (id)     => api.patch(`/bookings/${id}/cancel`),
  getMyBookings: ()   => api.get('/bookings/my-bookings'),
}
