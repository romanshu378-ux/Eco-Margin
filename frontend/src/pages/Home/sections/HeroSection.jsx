// EcoMargin Frontend — Dynamic Hero Section Component
// src/pages/Home/sections/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import publicApi from '../../../services/publicApi'

export default function HeroSection() {
  const videoRef = useRef(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [heroCMS, setHeroCMS] = useState({
    heroTitle: "Powering India's EV Infrastructure",
    heroSubtitle: "Design • Manufacturing • EPC Installation • OCPP Software • AMC Services",
    heroVideoUrl: "",
    background_video_url: "",
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
    let isMounted = true
    const fetchHeroCMS = async () => {
      try {
        const res = await publicApi.getHomepageCMS()
        if (isMounted && res && res.data) {
          setHeroCMS(prev => ({ ...prev, ...res.data }))
        }
      } catch (err) {
        console.warn('Hero CMS live fetch notice:', err.message)
      }
    }
    fetchHeroCMS()
    return () => { isMounted = false }
  }, [])

  const rawVideoUrl = heroCMS.background_video_url || heroCMS.heroVideoUrl || ''
  const timestamp = heroCMS.updatedAt || heroCMS.updated_at || Date.now()
  const cacheBustedVideoUrl = rawVideoUrl
    ? `${rawVideoUrl}${rawVideoUrl.includes('?') ? '&' : '?'}v=${new Date(timestamp).getTime() || Date.now()}`
    : ''

  useEffect(() => {
    if (videoRef.current && cacheBustedVideoUrl) {
      videoRef.current.load()
    }
  }, [cacheBustedVideoUrl])

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

        {/* 1. Responsive Full-Screen Background Video */}
        {cacheBustedVideoUrl && (
          <video
            ref={videoRef}
            key={rawVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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
            <source src={cacheBustedVideoUrl} type="video/mp4" />
          </video>
        )}

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
                  Leading Indian OEM Charger Manufacturer
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '-1px' }}>
                {heroCMS.heroTitle}
              </motion.h1>

              <motion.p variants={fadeUp} style={{ fontSize: '1.15rem', color: '#9CA3AF', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '580px' }}>
                {heroCMS.heroSubtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                <Button variant="primary" size="lg" onClick={() => setQuoteOpen(true)}>
                  {heroCMS.primaryButtonText || "Request Quote"} <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>

                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    {heroCMS.secondaryButtonText || "Contact Sales"}
                  </Button>
                </Link>

                <Link to="/downloads">
                  <Button variant="outline" size="lg" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    <FiDownload style={{ marginRight: '0.5rem' }} /> {heroCMS.brochureButtonText || "Brochures"}
                  </Button>
                </Link>
              </motion.div>

              {/* Real-time Hardware Spec Badges */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', flexWrap: 'wrap' }}>
                {heroCMS.stats && heroCMS.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10B981', fontFamily: 'Outfit' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.2rem' }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>

            </motion.div>

            {/* Right Interactive Visual Card */}
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div style={{
                background: 'rgba(17, 24, 39, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>Flagship Fast Charger</span>
                    <h3 style={{ fontSize: '1.5rem', margin: '0.25rem 0 0 0', fontFamily: 'Outfit' }}>EcoCharge 120kW DC</h3>
                  </div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    Dual CCS2
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Output Voltage</span>
                    <strong style={{ fontSize: '0.9rem' }}>200V – 1000V DC</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Peak Efficiency</span>
                    <strong style={{ fontSize: '0.9rem', color: '#10B981' }}>≥ 96.5%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>Weather Protection</span>
                    <strong style={{ fontSize: '0.9rem' }}>IP55 / IK10 Heavy Duty</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>OCPP Compliance</span>
                    <strong style={{ fontSize: '0.9rem' }}>OCPP 1.6J / 2.0.1 Ready</strong>
                  </div>
                </div>

                <Button variant="primary" fullWidth onClick={() => setQuoteOpen(true)}>
                  Request 120kW Spec & Pricing
                </Button>
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Global RFQ Quote Modal */}
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
