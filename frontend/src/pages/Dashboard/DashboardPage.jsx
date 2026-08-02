import React from 'react'
import SEO from '@seo/SEO'
import Button from '@components/ui/Button/Button'

export default function DashboardPage() {
  return (
    <>
      <SEO title="Dashboard" />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Welcome back, John!</h1>
        <Button variant="primary">Book New Slot</Button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Wallet Balance', value: '₹500.00', icon: '💰' },
          { label: 'Total Charges', value: '12', icon: '⚡' },
          { label: 'Total Saved', value: '154 kg CO2', icon: '🌱' }
        ].map((stat, i) => (
          <div key={i} style={{ background: 'var(--color-bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Outfit' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Recent Bookings</h2>
      <div style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>Station</th>
              <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>Cost</th>
              <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { station: 'Mumbai Central Hub', date: 'Oct 12, 2026', cost: '₹250.00', status: 'Completed', color: 'var(--color-primary)' },
              { station: 'Pune Koregaon Park', date: 'Oct 05, 2026', cost: '₹120.00', status: 'Completed', color: 'var(--color-primary)' },
              { station: 'Delhi Connaught', date: 'Sep 28, 2026', cost: '₹340.00', status: 'Cancelled', color: 'var(--color-error)' }
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{row.station}</td>
                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{row.date}</td>
                <td style={{ padding: '1rem' }}>{row.cost}</td>
                <td style={{ padding: '1rem', color: row.color, fontWeight: '500' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
