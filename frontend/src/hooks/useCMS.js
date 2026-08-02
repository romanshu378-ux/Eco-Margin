// EcoMargin Frontend — Reusable Custom React CMS Hooks
// src/hooks/useCMS.js

import { useState, useEffect } from 'react'
import publicApi from '../services/publicApi'

// Helper to safely extract payload from both nested ({ data: { ... } }) and unwrapped ({ companyName: "..." }) objects
function extractPayload(res) {
  if (!res) return null
  if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
    return res.data
  }
  if (res.data && Array.isArray(res.data)) {
    return res.data
  }
  // Unwrapped object check
  if (typeof res === 'object' && (res.heroTitle || res.companyName || res.vision || res.metaTitle || res.phone)) {
    return res
  }
  return res.data || null
}

// 1. Hook for Homepage CMS
export function useHomepage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchHomepage = async () => {
      try {
        const res = await publicApi.getHomepageCMS()
        const payload = extractPayload(res)
        if (isMounted && payload) {
          setData(payload)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchHomepage()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}

// 2. Hook for About Page CMS
export function useAbout() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchAbout = async () => {
      try {
        const res = await publicApi.getAboutCMS()
        const payload = extractPayload(res)
        if (isMounted && payload) {
          setData(payload)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchAbout()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}

// 3. Hook for Footer & Contact CMS
export function useFooter() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchFooter = async () => {
      try {
        const res = await publicApi.getFooterCMS()
        const payload = extractPayload(res)
        if (isMounted && payload) {
          setData(payload)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchFooter()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}

// 4. Hook for SEO Metadata
export function useSEO() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const fetchSEO = async () => {
      try {
        const res = await publicApi.getSEOCMS()
        const payload = extractPayload(res)
        if (isMounted && payload) {
          setData(payload)
        }
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchSEO()
    return () => { isMounted = false }
  }, [])

  return { data, loading, error }
}
