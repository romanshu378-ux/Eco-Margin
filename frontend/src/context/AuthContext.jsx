import React, { createContext, useContext, useState, useEffect } from 'react'
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
  const [token, setToken] = useState(localStorage.getItem('ecomargin_token'))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      if (token) {
        try {
          const res = await authService.getMe()
          if (res.success) {
            setUser(res.user)
          } else {
            logout()
          }
        } catch (err) {
          console.error('Failed to verify session:', err)
          logout()
        }
      }
      setLoading(false)
    }

    fetchMe()
  }, [token])

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.login(credentials)
      if (res.token) {
        localStorage.setItem('ecomargin_token', res.token)
        setToken(res.token)
        setUser(res.user)
        setLoading(false)
        return { success: true, user: res.user }
      }
      throw new Error(res.message || 'Login failed')
    } catch (err) {
      setLoading(false)
      const msg = err.message || 'Invalid email or password'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.register(userData)
      if (res.token) {
        localStorage.setItem('ecomargin_token', res.token)
        setToken(res.token)
        setUser(res.user)
        setLoading(false)
        return { success: true, user: res.user }
      }
      throw new Error(res.message || 'Registration failed')
    } catch (err) {
      setLoading(false)
      const msg = err.message || 'Registration failed'
      setError(msg)
      return { success: false, error: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem('ecomargin_token')
    setToken(null)
    setUser(null)
    authService.logout().catch(() => {})
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
