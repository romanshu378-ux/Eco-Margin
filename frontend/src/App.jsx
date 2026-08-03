import React from 'react'
import { ThemeProvider } from '@context/ThemeContext'
import LoadingScreen from '@components/common/LoadingScreen/LoadingScreen'
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop'
import AppRoutes from '@routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <LoadingScreen />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
