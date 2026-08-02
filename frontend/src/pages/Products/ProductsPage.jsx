import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'

export default function ProductsPage() {
  const products = [
    {
      id: 'csms',
      title: 'EcoMargin CSMS Cloud',
      subtitle: 'For Charge Point Operators',
      desc: 'Our flagship Charging Station Management System. Control hardware across multiple locations, set complex pricing algorithms, and resolve faults remotely.',
      features: ['Hardware Agnostic (OCPP 1.6J/2.0.1)', 'Real-time Telemetry & Diagnostics', 'Dynamic Load Balancing Algorithms', 'Automated Billing & Invoicing'],
      imagePlaceholder: '[CSMS Dashboard Preview]'
    },
    {
      id: 'app',
      title: 'EcoMargin Driver App',
      subtitle: 'For EV Drivers',
      desc: 'A beautifully designed app that removes range anxiety. Drivers can locate chargers, check real-time status, reserve slots, and pay instantly using the in-app wallet.',
      features: ['Live Availability Map', 'Route Planner with Charging Stops', 'RFID Card Integration', 'Charging History & Analytics'],
      imagePlaceholder: '[Mobile App UI Preview]'
    }
  ]

  return (
    <>
      <SEO title="Our Products" description="Discover the EcoMargin CSMS Cloud and Driver App." />
      
      <PageHeader 
        title="Our Products" 
        description="Comprehensive software solutions for operators and drivers."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          
          {products.map((prod, i) => (
            <div key={prod.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <motion.div variants={i % 2 === 0 ? slideInLeft : slideInRight} style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>{prod.subtitle}</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{prod.title}</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>{prod.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {prod.features.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ color: 'var(--color-primary)' }}>✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary">Learn More</Button>
              </motion.div>
              
              <motion.div variants={i % 2 === 0 ? slideInRight : slideInLeft} style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ width: '100%', aspectRatio: prod.id === 'app' ? '3/4' : '4/3', maxWidth: prod.id === 'app' ? '350px' : '100%', margin: '0 auto', background: 'var(--color-bg-card)', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ color: 'var(--color-text-muted)' }}>{prod.imagePlaceholder}</span>
                </div>
              </motion.div>
            </div>
          ))}

        </motion.div>
      </div>
    </>
  )
}
