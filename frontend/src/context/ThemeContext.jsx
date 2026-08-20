// EcoMargin Frontend — Light Theme Context Provider
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme] = useState('light')

  useEffect(() => {
    // Purge any stored dark theme preference
    try {
      localStorage.removeItem('ecomargin-theme')
      sessionStorage.removeItem('ecomargin-theme')
      localStorage.setItem('ecomargin-theme', 'light')
    } catch (e) {
      // Ignore storage errors
    }

    // Force HTML root to light theme
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.style.colorScheme = 'light'
    document.documentElement.classList.remove('dark')
  }, [])

  const toggleTheme = () => {
    // Permanent light theme mode (no-op)
  }

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  )
}
