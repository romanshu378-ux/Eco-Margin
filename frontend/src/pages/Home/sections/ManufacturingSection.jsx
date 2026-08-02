import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import { FiCpu, FiCheckSquare, FiShield, FiTruck, FiActivity } from 'react-icons/fi'

const factoryCapabilities = [
  {
    icon: <FiCpu />,
    title: 'Automated SMT PCB Assembly',
    description: 'High-precision surface mount technology lines for in-house controller boards and power metering modules.'
  },
  {
    icon: <FiActivity />,
    title: 'Full Power Burn-in Testing Lab',
    description: 'Every charger undergoes 48-hour full load endurance testing simulating high ambient temperatures.'
  },
  {
    icon: <FiShield />,
    title: 'ARAI & CE Quality Inspection',
    description: 'Multistage insulation resistance, surge protection, and ground fault safety verification.'
  },
  {
    icon: <FiTruck />,
    title: 'Pan-India EPC Logistics',
    description: 'Dedicated logistics network for safe site delivery, transformer setup, and rapid commissioning.'
  }
]

export default function ManufacturingSection() {
  return (
    <section style={{ padding: '7rem 0', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Description */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              State-of-the-Art Plant
            </motion.span>
            
            <motion.h2 variants={fadeUp} style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
              Manufacturing Capability & Engineering Excellence
            </motion.h2>
            
            <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              EcoMargin operates an ISO 9001 certified manufacturing plant equipped with automated SMT assembly, environmental chambers, and high-power load banks. Our R&D team designs every hardware and firmware layer locally in India.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>50,000+</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Annual Unit Capacity</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>100% In-House</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Firmware & Hardware R&D</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Capabilities Grid */}
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}
          >
            {factoryCapabilities.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  )
}
