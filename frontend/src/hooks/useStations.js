// EcoMargin — useStations Hook
// src/hooks/useStations.js

import { useQuery } from 'react-query'
import { stationService } from '@services/stationService'
import { useStationStore } from '@store/stationStore'

export function useStations(params = {}) {
  const { setStations, setError } = useStationStore()

  return useQuery(
    ['stations', params],
    () => stationService.getAll(params),
    {
      onSuccess: (data) => setStations(data.stations || []),
      onError:   (err)  => setError(err?.message),
      staleTime: 2 * 60 * 1000,
    },
  )
}

export function useStationDetail(id) {
  return useQuery(
    ['station', id],
    () => stationService.getById(id),
    { enabled: !!id, staleTime: 60 * 1000 },
  )
}

export function useNearbyStations(lat, lng, radius = 10) {
  return useQuery(
    ['stations', 'nearby', lat, lng],
    () => stationService.getNearby({ lat, lng, radius }),
    { enabled: !!(lat && lng), staleTime: 2 * 60 * 1000 },
  )
}
