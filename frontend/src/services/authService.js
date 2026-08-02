// EcoMargin — Auth Service
// src/services/authService.js
import api from './api'

export const authService = {
  login:        (credentials) => api.post('/auth/login', credentials),
  register:     (userData)    => api.post('/auth/register', userData),
  logout:       ()            => api.post('/auth/logout'),
  refreshToken: ()            => api.post('/auth/refresh'),
  forgotPassword: (email)     => api.post('/auth/forgot-password', { email }),
  resetPassword:  (data)      => api.post('/auth/reset-password', data),
  verifyEmail:    (token)     => api.get(`/auth/verify-email/${token}`),
  getMe:          ()          => api.get('/auth/me'),
}
