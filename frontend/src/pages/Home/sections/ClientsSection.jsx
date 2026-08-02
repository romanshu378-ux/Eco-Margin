import React from 'react'
import { motion } from 'framer-motion'

export default function ClientsSection() {
  const clients = ['Acme Corp', 'Global Logistics', 'City Transit', 'EcoRetail', 'Green Fleet', 'NextGen EV']

  return (
    <section style={{ padding: '4rem 0', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
      <div className="container">
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2rem' }}>
          Trusted by Industry Leaders
        </p>

        {/* Infinite auto-scroll marquee effect */}
        <div style={{ display: 'flex', position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
          <motion.div 
            animate={{ x: [0, -1035] }} // Adjust based on width of elements
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{ display: 'flex', gap: '4rem', padding: '0 2rem' }}
          >
            {/* Render twice for seamless loop */}
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div 
                key={i} 
                style={{ 
                  fontFamily: 'Outfit', 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--color-text-muted)', 
                  opacity: 0.5,
                  whiteSpace: 'nowrap'
                }}
              >
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
