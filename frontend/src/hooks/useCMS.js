// EcoMargin Frontend — Reusable Custom React CMS Hooks
// src/hooks/useCMS.js

import { useState, useEffect } from 'react'
import publicApi from '../services/publicApi'

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
        if (isMounted && res && res.data) {
          setData(res.data)
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
        if (isMounted && res && res.data) {
          setData(res.data)
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
        if (isMounted && res && res.data) {
          setData(res.data)
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
        if (isMounted && res && res.data) {
          setData(res.data)
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
