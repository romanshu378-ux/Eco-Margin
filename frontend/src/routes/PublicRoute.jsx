import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATHS } from './paths'
import { useAuthStore } from '@store/authStore'

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />
  }

  return children
}
