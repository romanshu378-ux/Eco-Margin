// EcoMargin Frontend — Automatic Route Scroll-to-Top Component
// src/components/common/ScrollToTop/ScrollToTop.jsx

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * Listens to React Router location changes (pathname & search query)
 * and resets browser viewport scroll position to top (0,0) instantly.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // Reset window scroll position to top-left (0,0)
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    } catch (err) {
      window.scrollTo(0, 0)
    }

    // Secondary fallback for document body/element scroll containers
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }, [pathname, search])

  return null
}
