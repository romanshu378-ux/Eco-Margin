import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function ServicesSection() {
  const services = [
    { title: 'Charge Point Management', desc: 'Remotely monitor, configure, and troubleshoot your chargers in real-time. OCPP compliant.', icon: '🔌' },
    { title: 'Billing & Payments', desc: 'Flexible tariff management, automated invoicing, and seamless wallet integrations for drivers.', icon: '💳' },
    { title: 'Fleet Management', desc: 'Dedicated tools for fleet operators to track usage, limit access, and optimize charging schedules.', icon: '🚐' },
    { title: 'Smart Energy Routing', desc: 'Dynamic load balancing to prevent grid overloads and minimize peak demand charges.', icon: '⚡' },
    { title: 'Driver Mobile App', desc: 'White-labeled iOS and Android apps for finding stations, reserving slots, and initiating sessions.', icon: '📱' },
    { title: 'Analytics & Reporting', desc: 'Customizable dashboards providing insights into utilization, revenue, and carbon savings.', icon: '📊' },
  ]

  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            Our Core Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}
          >
            A comprehensive suite of tools designed to handle every aspect of the EV charging lifecycle.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
        >
          {services.map((srv, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
              style={{ 
                background: 'var(--color-bg-card)', 
                padding: '2.5rem', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ 
                width: '60px', height: '60px', 
                background: 'var(--color-primary-light)', 
                borderRadius: '16px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '2rem', marginBottom: '1.5rem' 
              }}>
                {srv.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{srv.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{srv.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
