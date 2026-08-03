import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import publicApi from '@services/publicApi'

const fallbackIndustries = [
  { name: 'Express Highways & Fuel Pumps', icon: '🛣️', description: 'Ultra-fast DC charging hubs for long-distance EV travel and high-throughput highway plazas.' },
  { name: 'Commercial Fleets & Logistics', icon: '🚚', description: 'Dedicated fast charging infrastructure for 2W, 3W, and 4W e-commerce delivery fleets.' },
  { name: 'E-Bus & Transport Depots', icon: '🚌', description: 'Heavy-duty 240kW pantograph & dual CCS2 DC chargers for public bus fleets.' },
  { name: 'Hotels & Hospitality', icon: '🏨', description: 'Premium destination AC charging wallboxes for luxury guest amenities.' }
]

export default function IndustriesSection() {
  const [industries, setIndustries] = useState(fallbackIndustries)

  useEffect(() => {
    const fetchLiveIndustries = async () => {
      try {
        const res = await publicApi.getIndustries()
        if (res && res.data && res.data.length > 0) {
          setIndustries(res.data)
        }
      } catch (err) {
        console.warn('Live industries fetch notice:', err.message)
      }
    }
    fetchLiveIndustries()
  }, [])

  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Solutions for Every Industry
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Our OEM hardware and OCPP software adapt to your specific business vertical.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
        >
          {industries.map((ind, i) => (
            <motion.div 
              key={ind.id || i} 
              variants={fadeUp}
              style={{ 
                background: 'var(--color-bg-alt)', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                overflow: 'hidden'
              }}
            >
              <div style={{ height: '150px', background: 'var(--color-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', borderBottom: '1px solid var(--color-border)' }}>
                {ind.imageUrl ? (
                  <img src={ind.imageUrl} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  ind.icon || '⚡'
                )}
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{ind.name || ind.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{ind.description || ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
