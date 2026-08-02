// EcoMargin — useGeolocation Hook
// src/hooks/useGeolocation.js

import { useState, useEffect } from 'react'

export function useGeolocation(options = {}) {
  const [state, setState] = useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        loading: false,
        error: new Error('Geolocation is not supported'),
      }))
      return
    }

    const onSuccess = ({ coords, timestamp }) => {
      setState({
        loading: false,
        accuracy:         coords.accuracy,
        altitude:         coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading:          coords.heading,
        latitude:         coords.latitude,
        longitude:        coords.longitude,
        speed:            coords.speed,
        timestamp,
        error: null,
      })
    }

    const onError = (error) => {
      setState((s) => ({ ...s, loading: false, error }))
    }

    const watcher = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      ...options,
    })

    return () => navigator.geolocation.clearWatch(watcher)
  }, [])

  return state
}
