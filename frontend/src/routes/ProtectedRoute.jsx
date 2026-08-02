import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PATHS } from './paths'
import { useAuthStore } from '@store/authStore'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
  }

  return children
}
