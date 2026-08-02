import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'

export default function GalleryPage() {
  // Simulating a masonry layout grid with different sizes
  const items = [
    { height: '400px', label: 'CSMS Map View' },
    { height: '250px', label: 'Driver App Wallet' },
    { height: '250px', label: 'Station Hardware' },
    { height: '300px', label: 'Fleet Analytics' },
    { height: '350px', label: 'NOC Command Center' },
    { height: '200px', label: 'RFID Card Tap' },
    { height: '250px', label: 'Tariff Configuration' },
    { height: '300px', label: 'Load Balancing Graph' }
  ]

  return (
    <>
      <SEO title="Gallery" description="Visual showcase of the EcoMargin platform and hardware." />
      
      <PageHeader 
        title="Gallery" 
        description="A visual journey through our software interfaces and global hardware deployments."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
          style={{ 
            columnCount: window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1, 
            columnGap: '1.5rem' 
          }}
        >
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              style={{ 
                height: item.height, 
                background: 'var(--color-bg-card)', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--color-border)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                breakInside: 'avoid',
                transition: 'transform var(--transition-fast)',
                cursor: 'zoom-in',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1, opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }} className="gallery-overlay">
                <span style={{ color: '#fff', fontWeight: '600' }}>{item.label}</span>
              </div>
              <span style={{ color: 'var(--color-text-muted)', position: 'relative', zIndex: 0 }}>[{item.label}]</span>
            </motion.div>
          ))}
        </motion.div>

        <style>{`
          .gallery-overlay:hover { opacity: 1 !important; }
        `}</style>
      </div>
    </>
  )
}
