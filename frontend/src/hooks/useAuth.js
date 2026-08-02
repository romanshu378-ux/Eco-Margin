// EcoMargin — useAuth Hook
// src/hooks/useAuth.js

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '@store/authStore'
import { authService }  from '@services/authService'
import { APP_ROUTES }   from '@constants'

export function useAuth() {
  const navigate = useNavigate()
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  const handleLogin = useCallback(async (credentials) => {
    try {
      setLoading(true)
      const { data } = await authService.login(credentials)
      login(data.user, data.token)
      toast.success(`Welcome back, ${data.user.name}!`)
      navigate(APP_ROUTES.DASHBOARD)
    } catch (err) {
      toast.error(err?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [login, navigate, setLoading])

  const handleRegister = useCallback(async (userData) => {
    try {
      setLoading(true)
      const { data } = await authService.register(userData)
      login(data.user, data.token)
      toast.success('Account created! Welcome to EcoMargin.')
      navigate(APP_ROUTES.DASHBOARD)
    } catch (err) {
      toast.error(err?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [login, navigate, setLoading])

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      logout()
      navigate(APP_ROUTES.HOME)
      toast.success('Logged out successfully.')
    }
  }, [logout, navigate])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }
}
