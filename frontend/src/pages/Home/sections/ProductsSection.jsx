import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideInLeft, slideInRight } from '@animations/variants'
import Button from '@components/ui/Button/Button'

export default function ProductsSection() {
  return (
    <section style={{ padding: '8rem 0', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        
        {/* Product 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>For Operators</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>EcoMargin CSMS Cloud</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Our flagship Charging Station Management System. Control hardware across multiple locations, set complex pricing algorithms, and resolve faults before drivers even notice them.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {['Hardware Agnostic (OCPP 1.6J/2.0.1)', 'Real-time Telemetry & Diagnostics', 'Dynamic Load Balancing Algorithms'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)' }}>✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline">Explore CSMS</Button>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--color-bg-card)', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'var(--color-text-muted)' }}>[CSMS Dashboard Preview]</span>
            </div>
          </motion.div>
        </div>

        {/* Product 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft} style={{ order: window.innerWidth > 768 ? 0 : 1 }}>
            <div style={{ width: '100%', aspectRatio: '3/4', maxWidth: '350px', margin: '0 auto', background: 'var(--color-bg-card)', borderRadius: '32px', border: '8px solid var(--color-border)', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'var(--color-text-muted)' }}>[Mobile App Preview]</span>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight} style={{ order: window.innerWidth > 768 ? 1 : 0 }}>
            <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>For Drivers</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>EcoMargin App</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              A beautifully designed app that removes range anxiety. Drivers can locate chargers, check real-time status, reserve slots, and pay instantly using the in-app wallet.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {['Live Availability Map', 'Route Planner with Charging Stops', 'RFID Card Integration'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--color-primary)' }}>✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline">Download App</Button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
