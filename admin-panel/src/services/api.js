// EcoMargin Admin Panel — Axios API Service
// admin-panel/src/services/api.js

import axios from 'axios';

const getApiBaseUrl = () => {
  let rawUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://eco-margin-web.onrender.com/api/v1';

  rawUrl = rawUrl
    .replace('https://eco-margin-1-web.onrender.com', 'https://eco-margin-web.onrender.com')
    .replace('https://eco-margin.onrender.com', 'https://eco-margin-web.onrender.com')
    .replace('https://ecomargin-api.onrender.com', 'https://eco-margin-web.onrender.com');

  rawUrl = rawUrl.replace(/\/+$/, '');

  if (!rawUrl.endsWith('/api/v1')) {
    if (rawUrl.endsWith('/api')) {
      rawUrl = `${rawUrl}/v1`;
    } else {
      rawUrl = `${rawUrl}/api/v1`;
    }
  }

  return rawUrl;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
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
    if (axios.isCancel(error) || error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') {
      return Promise.reject({ isCanceled: true, message: 'Request canceled' });
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'Server communication error';

    if (status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }

    return Promise.reject({
      status,
      message,
      data: error.response?.data,
      isCanceled: false
    });
  },
);

export default api;
