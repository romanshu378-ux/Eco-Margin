// EcoMargin Frontend — Dynamic Gallery Section ("EcoMargin in Action")
// src/pages/Home/sections/GallerySection.jsx

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import publicApi from '@services/publicApi'

// High-resolution fallback gallery items for software & factory showcase
const defaultGalleryItems = [
  {
    id: 1,
    title: 'Central Management System (CSMS) Live Map View',
    category: 'OCPP Software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    isWide: true
  },
  {
    id: 2,
    title: 'Mobile App RFID & Wallet Top-up UI',
    category: 'Mobile App',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    isWide: false
  },
  {
    id: 3,
    title: '24/7 NOC Fleet Analytics Dashboard',
    category: 'Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isWide: false
  },
  {
    id: 4,
    title: 'Heavy-Duty 120kW DC Station Installation',
    category: 'Hardware Deployment',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    isWide: false
  }
]

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageErrorMap, setImageErrorMap] = useState({})

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)
      try {
        const response = await publicApi.getGallery()
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
          setGalleryItems(response.data)
        } else {
          setGalleryItems(defaultGalleryItems)
        }
      } catch (err) {
        console.warn('⚠️ [GallerySection] Offline or API error, using default showcase:', err.message)
        setGalleryItems(defaultGalleryItems)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const handleImageError = (id) => {
    setImageErrorMap(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section style={{ padding: '8rem 0', background: 'var(--color-bg)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            EcoMargin in Action
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '650px', margin: '0 auto' }}>
            A glimpse into our beautifully crafted software interfaces, NOC analytics dashboards, and factory assembly lines.
          </motion.p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[1, 2, 3, 4].map(idx => (
              <div 
                key={idx} 
                className="skeleton-card"
                style={{ 
                  height: idx === 1 ? '320px' : '250px', 
                  gridColumn: idx === 1 ? '1 / -1' : 'span 1',
                  background: 'var(--color-bg-card)', 
                  borderRadius: 'var(--radius-xl)', 
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              />
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', margin: 0 }}>
              No gallery images available at this time.
            </p>
          </div>
        ) : (
          /* Dynamic Gallery Grid */
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', gridAutoRows: '260px' }}
          >
            {galleryItems.map((item, index) => {
              const src = item.imageUrl || item.image_url
              const isWide = item.isWide || index === 0
              const hasError = imageErrorMap[item.id || index]
              const fallbackUrl = defaultGalleryItems[index % defaultGalleryItems.length].imageUrl

              return (
                <motion.div 
                  key={item.id || index} 
                  variants={fadeUp} 
                  whileHover={{ y: -4 }}
                  style={{ 
                    gridColumn: isWide ? '1 / -1' : 'span 1', 
                    gridRow: isWide ? 'span 1' : 'span 1',
                    background: 'var(--color-bg-card)', 
                    borderRadius: 'var(--radius-xl)', 
                    border: '1px solid var(--color-border)', 
                    overflow: 'hidden', 
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <img 
                    src={hasError ? fallbackUrl : (src || fallbackUrl)} 
                    alt={item.title || 'EcoMargin Platform Showcase'} 
                    onError={() => handleImageError(item.id || index)}
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    className="gallery-img-hover"
                  />

                  {/* Gradient Overlay & Badge */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'flex-end', 
                      padding: '1.5rem',
                      color: '#ffffff'
                    }}
                  >
                    <span 
                      style={{ 
                        background: 'rgba(16, 185, 129, 0.25)', 
                        color: '#10b981', 
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '0.2rem 0.65rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        width: 'fit-content', 
                        marginBottom: '0.5rem',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      {item.category || 'Platform Showcase'}
                    </span>
                    <h3 style={{ fontSize: isWide ? '1.35rem' : '1.1rem', fontWeight: 600, margin: 0, color: '#ffffff' }}>
                      {item.title || 'EcoMargin Hardware & Software Platform'}
                    </h3>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

      </div>

      <style>{`
        .skeleton-card {
          animation: pulseSkeleton 1.5s infinite ease-in-out;
        }
        @keyframes pulseSkeleton {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        .gallery-img-hover:hover {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  )
}
