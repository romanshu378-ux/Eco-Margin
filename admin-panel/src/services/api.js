// EcoMargin Admin Panel — Axios API Service
// admin-panel/src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor — attach JWT ──────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor — handle errors & 401 ─────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Server communication error';

    if (status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data
    });
  },
);

export default api;
