// EcoMargin — Axios API Service
// src/services/api.js

import axios from "axios";

// Base URL
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://eco-margin.onrender.com/api/v1";

// Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ================================
// Request Interceptor
// ================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecomargin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
// Response Interceptor
// ================================
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Network Error
    if (!error.response) {
      return Promise.reject({
        success: false,
        status: 0,
        message:
          "Unable to connect to the server. Please check your internet connection.",
      });
    }

    const status = error.response.status;

    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      "Something went wrong.";

    switch (status) {
      case 400:
        console.error("Bad Request");
        break;

      case 401:
        console.warn("Unauthorized");

        localStorage.removeItem("ecomargin_token");

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        break;

      case 403:
        console.warn("Forbidden");
        break;

      case 404:
        console.warn("API Not Found");
        break;

      case 422:
        console.warn("Validation Error");
        break;

      case 429:
        console.warn("Too Many Requests");
        break;

      case 500:
        console.error("Internal Server Error");
        break;

      default:
        console.error(message);
    }

    return Promise.reject({
      success: false,
      status,
      message,
      data: error.response.data,
    });
  }
);

// ================================
// Helper Methods
// ================================

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("ecomargin_token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("ecomargin_token");
    delete api.defaults.headers.common.Authorization;
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem("ecomargin_token");
  delete api.defaults.headers.common.Authorization;
};

export default api;