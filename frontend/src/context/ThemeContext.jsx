// EcoMargin Frontend — Dynamic Theme Context Provider
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
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('ecomargin-theme')
      if (saved === 'dark' || saved === 'light') {
        return saved
      }
    } catch (e) {
      // Storage access disabled or unavailable
    }
    return 'light'
  })

  useEffect(() => {
    try {
      localStorage.setItem('ecomargin-theme', theme)
    } catch (e) {
      // Storage save error
    }

    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}
