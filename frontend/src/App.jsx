import React from 'react'
import { ThemeProvider } from '@context/ThemeContext'
import LoadingScreen from '@components/common/LoadingScreen/LoadingScreen'
import AppRoutes from '@routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
