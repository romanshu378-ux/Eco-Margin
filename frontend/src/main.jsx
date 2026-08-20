import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'

// CSS Imports
import '@styles/variables.css'
import '@styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Register service worker for PWA support with auto-update
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('PWA Service Worker registered:', reg.scope);
        reg.update();
      })
      .catch((err) => console.warn('PWA Service Worker registration failed:', err));
  });
}

// Automatic recovery for chunk loading errors caused by new deployments
window.addEventListener('error', (event) => {
  const isChunkError = 
    event.message && (
      event.message.includes('Loading chunk') || 
      event.message.includes('Failed to fetch dynamically imported module') ||
      event.message.includes('Importing a module script failed')
    );
    
  if (isChunkError) {
    console.warn('Stale chunk load error detected. Reloading page to fetch latest deployment...');
    const hasReloaded = sessionStorage.getItem('chunk_error_reloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('chunk_error_reloaded', 'true');
      window.location.reload();
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: 'var(--color-bg-card)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)'
              }
            }} 
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
