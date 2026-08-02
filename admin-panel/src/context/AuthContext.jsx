// EcoMargin Admin Panel — Auth Context
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setUser(null)
    authService.logout().catch(() => {})
  }, [])

  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      const storedToken = localStorage.getItem('admin_token')
      if (storedToken) {
        try {
          const res = await authService.getMe()
          if (isMounted) {
            if (res && res.success && res.user) {
              setUser(res.user)
            } else {
              localStorage.removeItem('admin_token')
              setToken(null)
              setUser(null)
            }
          }
        } catch (err) {
          console.warn('[AuthContext] Session verification notice:', err.message || err)
          if (isMounted) {
            localStorage.removeItem('admin_token')
            setToken(null)
            setUser(null)
          }
        }
      }
      if (isMounted) {
        setLoading(false)
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.login({ email, password })
      if (res && res.success && res.token) {
        localStorage.setItem('admin_token', res.token)
        setToken(res.token)
        setUser(res.user)
        setLoading(false)
        return { success: true, user: res.user }
      }
      throw new Error(res?.message || 'Authentication failed')
    } catch (err) {
      setLoading(false)
      const msg = err.message || 'Invalid email or password'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
