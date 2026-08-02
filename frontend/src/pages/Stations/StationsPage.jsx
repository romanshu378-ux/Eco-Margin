import React from 'react'
import SEO from '@seo/SEO'
import Badge from '@components/ui/Badge/Badge'
import Button from '@components/ui/Button/Button'

// Mock Data
const STATIONS = [
  { id: 1, name: 'EcoMargin Hub - Mumbai Central', address: 'Near CST Station, Mumbai', type: 'DC Fast', power: '60 kW', price: '₹12.50/kWh', available: true },
  { id: 2, name: 'EcoMargin Hub - Pune Koregaon', address: 'Koregaon Park, Pune', type: 'AC', power: '22 kW', price: '₹8.00/kWh', available: false },
  { id: 3, name: 'EcoMargin Hub - Delhi Connaught', address: 'Connaught Place, New Delhi', type: 'DC Fast', power: '150 kW', price: '₹18.00/kWh', available: true },
]

export default function StationsPage() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      <SEO title="Find Stations" />

      {/* Sidebar List */}
      <aside style={{ width: '400px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Find a Station</h1>
          <input 
            type="text" 
            placeholder="Search by city or location..."
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text)', outline: 'none' }}
          />
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {STATIONS.map(station => (
            <div key={station.id} style={{ padding: '1.25rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '1rem', cursor: 'pointer', transition: 'border-color var(--transition-fast)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.125rem' }}>{station.name}</h3>
                <Badge variant={station.available ? 'success' : 'neutral'}>
                  {station.available ? 'Available' : 'Occupied'}
                </Badge>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{station.address}</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                <div><span style={{ color: 'var(--color-text-muted)' }}>Type:</span> <strong>{station.type}</strong></div>
                <div><span style={{ color: 'var(--color-text-muted)' }}>Power:</span> <strong>{station.power}</strong></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{station.price}</div>
                <Button variant={station.available ? 'primary' : 'outline'} size="sm" disabled={!station.available}>
                  {station.available ? 'Book Slot' : 'Notify Me'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Map Area */}
      <main style={{ flex: 1, background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
          <h2>Interactive Map Placeholder</h2>
          <p>Leaflet / Google Maps integration goes here in Phase 3.</p>
        </div>
      </main>
    </div>
  )
}
