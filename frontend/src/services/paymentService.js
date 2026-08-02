// EcoMargin — Payment Service
// src/services/paymentService.js
import api from './api'

export const paymentService = {
  createOrder:     (data)    => api.post('/payments/create-order', data),
  verifyPayment:   (data)    => api.post('/payments/verify', data),
  getHistory:      (params)  => api.get('/payments/history', { params }),
  getInvoice:      (id)      => api.get(`/payments/${id}/invoice`),
  refundRequest:   (id, data)=> api.post(`/payments/${id}/refund`, data),
}
