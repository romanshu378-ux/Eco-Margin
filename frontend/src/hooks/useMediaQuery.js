// EcoMargin — useMediaQuery Hook
// src/hooks/useMediaQuery.js

import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// ── Convenience Exports ───────────────────────────────────────
export const useIsMobile  = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet  = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
