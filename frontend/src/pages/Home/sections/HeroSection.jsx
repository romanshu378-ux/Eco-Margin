// EcoMargin Frontend — Dynamic Hero Section Component
// src/pages/Home/sections/HeroSection.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import publicApi from '../../../services/publicApi'

export default function HeroSection() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [heroCMS, setHeroCMS] = useState({
    heroTitle: "Powering India's EV Infrastructure",
    heroSubtitle: "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
    heroVideoUrl: "https://res.cloudinary.com/dcumpbswm/video/upload/v1785698504/123456_mwb4qr.mp4",
    primaryButtonText: "Request Quote",
    secondaryButtonText: "Contact Sales",
    brochureButtonText: "Download Brochure",
    stats: [
      { label: "AC & DC Fast Range", value: "3.3kW – 240kW" },
      { label: "Certified Factory", value: "ISO & ARAI" },
      { label: "Network Uptime", value: "99.8%" }
    ]
  })

  useEffect(() => {
    const fetchHeroCMS = async () => {
      try {
        const res = await publicApi.getHomepageCMS()
        if (res && res.data) {
          setHeroCMS(prev => ({ ...prev, ...res.data }))
        }
      } catch (err) {
        console.warn('Hero CMS live fetch notice:', err.message)
      }
    }
    fetchHeroCMS()
  }, [])

  const videoSrc = heroCMS.heroVideoUrl || "https://res.cloudinary.com/dcumpbswm/video/upload/v1785698504/123456_mwb4qr.mp4"

  return (
    <>
      <section style={{ 
        minHeight: '92vh', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0 4rem 0',
        background: '#0B0F19',
        color: '#ffffff'
      }}>

        {/* 1. Responsive Full-Screen Cloudinary Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* 2. Dark Overlay for Contrast & Text Readability (60% Opacity) */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(11, 15, 25, 0.60)', 
            zIndex: 1 
          }} 
        />

        {/* Glow Ambient Highlights */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: 1 }} />

        {/* 3. Hero Content Wrapper (Positioned above video & overlay with zIndex: 2) */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Content */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              
              <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.25rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#10B981' }}>
                  OEM EV Charger Manufacturer
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', marginBottom: '1.25rem', lineHeight: '1.1', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>
                {heroCMS.heroTitle.includes('Infrastructure') ? (
                  <>
                    Powering India's <br />
                    <span style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #3B82F6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      EV Infrastructure.
                    </span>
                  </>
                ) : (
                  heroCMS.heroTitle
                )}
              </motion.h1>

              {/* Core Pillars */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                {heroCMS.heroSubtitle}
              </motion.div>
              
              <motion.p variants={fadeUp} style={{ color: '#9CA3AF', fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: '1.6' }}>
                Engineering heavy-duty commercial AC chargers (3.3kW–22kW) and ultra-fast DC charging stations (20kW–240kW) for highways, fleets, CPOs, bus depots, and commercial real estate.
              </motion.p>
              
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button size="lg" variant="primary" onClick={() => setQuoteOpen(true)}>
                  {heroCMS.primaryButtonText} <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline">{heroCMS.secondaryButtonText}</Button>
                </Link>
                <Link to="/downloads">
                  <Button size="lg" variant="ghost" style={{ color: '#9CA3AF' }}>
                    <FiDownload style={{ marginRight: '0.5rem' }} /> {heroCMS.brochureButtonText}
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {heroCMS.stats.map((st, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>{st.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{st.label}</div>
                  </div>
                ))}
              </motion.div>

            </motion.div>

            {/* Right Product Industrial Showcase */}
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ position: 'relative' }}>
              <div style={{ 
                background: 'rgba(21, 26, 45, 0.85)', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                borderRadius: '24px', 
                padding: '2.5rem', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                position: 'relative',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '1px' }}>
                    FLAGSHIP MODEL
                  </span>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '0.75rem', fontWeight: 700 }}>
                    Dual CCS2 Gun
                  </span>
                </div>

                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#ffffff' }}>EcoCharge 120kW Dual DC Fast Station</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '2rem' }}>Heavy Duty Ultra-Fast Highway & Bus Depot Charging System</p>

                {/* Industrial Specifications Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Output Power</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>120kW (Scalable to 160kW)</div>
                  </div>
                  <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Connector Type</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>Dual CCS2 (GB/T Option)</div>
                  </div>
                  <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Protection Rating</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>IP55 Outdoor Rated</div>
                  </div>
                  <div style={{ background: 'rgba(11, 15, 25, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Communication</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>OCPP 2.0.1 / 4G / Ethernet</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button variant="primary" fullWidth onClick={() => setQuoteOpen(true)}>
                    Request Technical Datasheet
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultProduct="120kW Ultra Fast DC Station" />
    </>
  )
}
