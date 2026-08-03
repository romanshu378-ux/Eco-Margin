import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import publicApi from '@services/publicApi'

const fallbackGallery = [
  { title: 'Automated SMT PCB Controller Assembly Line', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { title: 'Heavy-Duty IP55 Galvanized Steel Enclosure Fabrication', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
  { title: '48-Hour Full-Load Burn-in Thermal Test Chamber', category: 'Testing & Quality', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { title: '60kW & 120kW Dual CCS2 DC Fast Charger Assembly', category: 'Factory & Manufacturing', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' }
]

export default function GalleryPage() {
  const [items, setItems] = useState(fallbackGallery)

  useEffect(() => {
    const fetchLiveGallery = async () => {
      try {
        const res = await publicApi.getGallery()
        if (res && res.data && res.data.length > 0) {
          setItems(res.data)
        }
      } catch (err) {
        console.warn('Live gallery fetch notice:', err.message)
      }
    }
    fetchLiveGallery()
  }, [])

  return (
    <>
      <SEO title="Factory & Plant Gallery" description="Visual showcase of EcoMargin ISO 9001 certified manufacturing plant and labs." />
      
      <PageHeader 
        title="Factory & Manufacturing Gallery" 
        description="A visual tour through our 50,000 sq.ft. certified manufacturing facility, cleanroom SMT lines, and endurance testing labs."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
          style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'
          }}
        >
          {items.map((item, i) => {
            const img = item.imageUrl || item.image_url;
            return (
              <motion.div 
                key={item.id || i} 
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                style={{ 
                  height: '320px', 
                  background: 'var(--color-bg-card)', 
                  borderRadius: 'var(--radius-xl)', 
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                {img ? (
                  <img src={img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                    [{item.title}]
                  </div>
                )}

                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', 
                    zIndex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'flex-end', 
                    padding: '1.5rem' 
                  }}
                >
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', width: 'fit-content', marginBottom: '0.5rem' }}>
                    {item.category || 'Factory & Plant'}
                  </span>
                  <span style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{item.title}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}
