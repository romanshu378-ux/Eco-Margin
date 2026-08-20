// EcoMargin Frontend — Dynamic Public About Section (Homepage)
// src/pages/Home/sections/IntroSection.jsx

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import { useAbout } from '../../../hooks/useCMS'

const DEFAULT_ABOUT_IMAGE = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'

export default function IntroSection() {
  const { data: aboutData } = useAbout()
  const [imageSrc, setImageSrc] = useState(null)

  const eyebrow = aboutData?.sectionEyebrow || 'ABOUT ECOMARGIN'
  const title = aboutData?.title || 'Powering the Future of Electric Mobility'
  const description = aboutData?.description || 'EcoMargin LLP is a leading Indian EV charging infrastructure and charger manufacturing company committed to reliable hardware, smart OCPP software, and green mobility.'
  const secondaryDesc = aboutData?.secondaryDescription || 'From commercial AC chargers to ultra-fast DC charging hubs, EcoMargin provides end-to-end EPC installation, OCPP software management, and 24/7 AMC maintenance across India.'

  const primaryBtnText = aboutData?.primaryButtonText || 'Explore Our Solutions'
  const primaryBtnUrl = aboutData?.primaryButtonUrl || '/solutions'
  const secondaryBtnText = aboutData?.secondaryButtonText || 'Contact Us'
  const secondaryBtnUrl = aboutData?.secondaryButtonUrl || '/contact'

  const cmsImageUrl = aboutData?.imageUrl || aboutData?.image_url
  const finalImage = imageSrc || cmsImageUrl || DEFAULT_ABOUT_IMAGE
  const imageAlt = aboutData?.imageAlt || aboutData?.image_alt || 'EcoMargin EV Charging Station Infrastructure'

  return (
    <section 
      aria-label="About EcoMargin Section"
      style={{ 
        padding: '6rem 0', 
        background: 'var(--color-bg-alt)', 
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3.5rem', 
            alignItems: 'center' 
          }}
        >
          
          {/* LEFT SIDE: Content Block */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            {/* Small Green Eyebrow */}
            <motion.div 
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                background: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.25rem'
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {eyebrow}
              </span>
            </motion.div>

            {/* Main Heading H2 */}
            <motion.h2 
              variants={fadeUp}
              style={{ 
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', 
                fontWeight: 800, 
                lineHeight: 1.2, 
                color: 'var(--color-text)', 
                marginBottom: '1.5rem',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {title}
            </motion.h2>

            {/* Short Introduction Paragraphs */}
            <motion.p 
              variants={fadeUp}
              style={{ 
                color: 'var(--color-text)', 
                fontSize: '1.05rem', 
                lineHeight: 1.7, 
                marginBottom: '1rem',
                fontWeight: 500
              }}
            >
              {description}
            </motion.p>

            {secondaryDesc && (
              <motion.p 
                variants={fadeUp}
                style={{ 
                  color: 'var(--color-text-muted)', 
                  fontSize: '0.95rem', 
                  lineHeight: 1.75, 
                  marginBottom: '2rem'
                }}
              >
                {secondaryDesc}
              </motion.p>
            )}

            {/* Action CTAs */}
            <motion.div 
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%' }}
            >
              <Link 
                to={primaryBtnUrl} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.65rem',
                  background: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.3)',
                  transition: 'transform var(--transition-fast)'
                }}
              >
                {primaryBtnText} <FiArrowRight />
              </Link>

              <Link 
                to={secondaryBtnUrl} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.65rem',
                  background: 'var(--color-bg-card)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {secondaryBtnText} <FiArrowRight />
              </Link>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE: Visual Card & Floating Information Overlay */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ position: 'relative', width: '100%' }}
          >
            <div 
              style={{ 
                position: 'relative', 
                borderRadius: 'var(--radius-xl)', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--color-bg-card)',
                height: '380px'
              }}
            >
              <img 
                src={finalImage} 
                alt={imageAlt}
                onError={() => setImageSrc(DEFAULT_ABOUT_IMAGE)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 50%, rgba(15, 23, 42, 0.35) 100%)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Subtle Floating Information Overlay Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1.25rem',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }} />
              <span>Smart • Reliable • Scalable</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
