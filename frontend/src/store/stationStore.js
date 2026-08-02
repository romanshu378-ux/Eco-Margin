// EcoMargin — Zustand Station Store
// src/store/stationStore.js

import { create } from 'zustand'

export const useStationStore = create((set, get) => ({
  // ── State ───────────────────────────────────────────────────
  stations:       [],
  selectedStation: null,
  filters: {
    chargerType:  null,  // 'AC' | 'DC' | 'FAST'
    status:       null,  // 'available' | 'occupied' | 'offline'
    rating:       null,  // min rating
    maxDistance:  null,  // km
  },
  mapCenter: {
    lat: 20.5937,
    lng: 78.9629,
  },
  isLoading:  false,
  error:      null,

  // ── Actions ─────────────────────────────────────────────────
  setStations:        (stations)       => set({ stations }),
  setSelectedStation: (station)        => set({ selectedStation: station }),
  setFilters:         (filters)        => set((s) => ({ filters: { ...s.filters, ...filters } })),
  resetFilters:       ()               => set({ filters: { chargerType: null, status: null, rating: null, maxDistance: null } }),
  setMapCenter:       (lat, lng)       => set({ mapCenter: { lat, lng } }),
  setLoading:         (isLoading)      => set({ isLoading }),
  setError:           (error)          => set({ error }),
}))
