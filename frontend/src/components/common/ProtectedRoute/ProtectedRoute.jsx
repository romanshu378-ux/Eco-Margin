// Placeholder — ProtectedRoute Component
// src/components/common/ProtectedRoute/ProtectedRoute.jsx

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

function ProtectedRoute({ requiredRole = null }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" replace />

  return <Outlet />
}

export default ProtectedRoute
