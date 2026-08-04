// EcoMargin Frontend — Automatic Route Scroll-to-Top Component
// src/components/common/ScrollToTop/ScrollToTop.jsx

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView } from '../../../utils/analytics'

/**
 * ScrollToTop & Analytics Route Tracker Component
 * Listens to React Router location changes (pathname & search query),
 * initializes GA4/GTM/Clarity, tracks pageviews, and resets scroll position to top.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // 1. Initialize Analytics (GA4, GTM, Clarity) on mount
    initAnalytics()
  }, [])

  useEffect(() => {
    // 2. Reset window scroll position to top-left (0,0)
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    } catch (err) {
      window.scrollTo(0, 0)
    }

    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }

    // 3. Track Pageview on route change
    trackPageView(pathname + search)
  }, [pathname, search])

  return null
}
