import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { FiZap, FiShield, FiCpu, FiCheckCircle } from 'react-icons/fi'

const products = [
  {
    title: 'AC Smart Destination Charger',
    power: '7.4kW / 22kW Dual Gun',
    type: 'AC Charging',
    connector: 'Type 2 Gun (IEC 62196-2)',
    protection: 'IP55 / IK10 Vandal Proof',
    application: 'Commercial Real Estate, Hotels, Apartments, Office Complexes',
    features: ['OCPP 1.6J / 2.0.1 Cloud Connected', 'RFID & Mobile App Authentication', 'Dynamic Load Management (DLM)'],
    badge: 'Popular AC'
  },
  {
    title: 'DC Commercial Fast Charger',
    power: '30kW / 60kW Single/Dual Gun',
    type: 'DC Fast Charging',
    connector: 'CCS2 / GB/T Dual Connector',
    protection: 'IP55 Outdoor Weatherproof',
    application: 'Commercial Fleet Depots, Malls, Highway Amenities, Fuel Stations',
    features: ['0 to 80% Charge in 45 Minutes', 'Liquid Cooled Power Cables Option', 'Integrated 7" Touchscreen & POS Terminal'],
    badge: 'Fleet Choice'
  },
  {
    title: 'Ultra-Fast DC Highway Station',
    power: '120kW / 160kW / 240kW',
    type: 'Ultra Fast DC',
    connector: 'Dual CCS2 Heavy Duty Guns',
    protection: 'IP55 Outdoor Stainless Steel',
    application: 'Express Highways, Public CPO Hubs, Heavy Bus Depots',
    features: ['Simultaneous Dual Charging', 'Smart Power Sharing Technology', 'Integrated Energy Metering (Class 0.5)'],
    badge: 'Highways & Buses'
  }
]

export default function ProductsSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')

  const handleOpenQuote = (productTitle) => {
    setSelectedProduct(productTitle)
    setQuoteModalOpen(true)
  }

  return (
    <section style={{ padding: '7rem 0', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            OEM Manufacturing Spectrum
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
            EV Charging Products (3.3kW to 240kW)
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Designed, engineered, and manufactured in India for extreme weather conditions and heavy commercial usage.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}
        >
          {products.map((p, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {p.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{p.type}</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {p.power}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <div><strong>Connector:</strong> {p.connector}</div>
                  <div><strong>Protection:</strong> {p.protection}</div>
                  <div><strong>Ideal For:</strong> {p.application}</div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {p.features.map((feat, fIndex) => (
                    <li key={fIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <FiCheckCircle style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button variant="primary" fullWidth onClick={() => handleOpenQuote(p.title)}>
                  Request Commercial Quote
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} defaultProduct={selectedProduct} />
    </section>
  )
}
