// EcoMargin Frontend — Dynamic Corporate About Page
// src/pages/About/AboutPage.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { FiTarget, FiCompass, FiShield, FiArrowRight } from 'react-icons/fi'
import { useAbout } from '../../hooks/useCMS'

const DEFAULT_ABOUT_IMAGE = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'

export default function AboutPage() {
  const { data: aboutData } = useAbout()
  const [imageSrc, setImageSrc] = useState(null)

  const title = aboutData?.title || 'Powering the Future of Electric Mobility'
  const description = aboutData?.description || 'EcoMargin LLP is a leading Indian EV charging infrastructure and charger manufacturing company committed to reliable hardware, smart OCPP software, and green mobility.'
  const secondaryDesc = aboutData?.secondaryDescription || 'From commercial AC chargers to ultra-fast DC charging hubs, EcoMargin provides end-to-end EPC installation, OCPP software management, and 24/7 AMC maintenance across India.'

  const story = aboutData?.story || 'Founded in 2020, EcoMargin LLP has grown into a leading OEM EV charger manufacturer and EPC infrastructure contractor operating a certified facility in India.'
  const directorMsg = aboutData?.directorMessage || "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring."

  const missionTitle = aboutData?.missionTitle || 'Our Mission'
  const missionDesc = aboutData?.missionDescription || aboutData?.mission || 'Engineering indigenous, high-uptime commercial EV chargers tailored for harsh grid conditions and heavy fleet demands.'

  const visionTitle = aboutData?.visionTitle || 'Our Vision'
  const visionDesc = aboutData?.visionDescription || aboutData?.vision || 'To accelerate clean electric mobility adoption across highways, workplaces, and commercial hubs in India.'

  const valuesTitle = aboutData?.valuesTitle || 'Our Core Values'
  const valuesDesc = aboutData?.valuesDescription || 'Engineering excellence, safety compliance, 99.8% network uptime, and customer-centric technical support.'

  const primaryBtnText = aboutData?.primaryButtonText || 'Explore Our Solutions'
  const primaryBtnUrl = aboutData?.primaryButtonUrl || '/solutions'
  const secondaryBtnText = aboutData?.secondaryButtonText || 'Contact Sales'
  const secondaryBtnUrl = aboutData?.secondaryButtonUrl || '/contact'

  const cmsImageUrl = aboutData?.imageUrl || aboutData?.image_url
  const finalImage = imageSrc || cmsImageUrl || DEFAULT_ABOUT_IMAGE
  const imageAlt = aboutData?.imageAlt || aboutData?.image_alt || 'EcoMargin EV Charging Infrastructure'

  return (
    <>
      <SEO 
        title="About EcoMargin LLP | EV Charging Infrastructure Company" 
        description="EcoMargin LLP is a leading Indian EV charging infrastructure and charger manufacturing company committed to reliable hardware, smart OCPP software, and green mobility." 
        pageRoute="/about"
      />
      
      <PageHeader 
        title="About EcoMargin Corporate" 
        description="Pioneering Indigenous EV Charger Manufacturing & Turnkey EPC Infrastructure."
      />

      <div style={{ background: 'var(--color-bg)', minHeight: '100vh', padding: '5rem 0' }}>
        <div className="container">
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
          >
            
            {/* Top Overview Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <motion.div variants={fadeUp}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--color-primary-light)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', display: 'inline-block', marginBottom: '1rem' }}>
                  {aboutData?.sectionEyebrow || 'ABOUT ECOMARGIN'}
                </span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif', lineHeight: 1.25 }}>
                  {title}
                </h2>
                <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1rem', fontWeight: 500 }}>
                  {description}
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                  {secondaryDesc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link to={primaryBtnUrl} style={{ background: 'var(--color-primary)', color: '#FFFFFF', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    {primaryBtnText} <FiArrowRight />
                  </Link>
                  <Link to={secondaryBtnUrl} style={{ background: 'var(--color-bg-card)', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    {secondaryBtnText} <FiArrowRight />
                  </Link>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} style={{ height: '360px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
                <img 
                  src={finalImage} 
                  alt={imageAlt} 
                  onError={() => setImageSrc(DEFAULT_ABOUT_IMAGE)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>
            </div>

            {/* Corporate Story Box */}
            <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '1rem', fontFamily: 'Outfit' }}>
                Our Corporate Journey
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {story}
              </p>
              <div style={{ padding: '1rem 1.25rem', background: 'var(--color-primary-light)', borderLeft: '4px solid var(--color-primary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 500 }}>
                "{directorMsg}"
              </div>
            </motion.div>

            {/* Mission, Vision & Values Cards */}
            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  <FiTarget />
                </div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{missionTitle}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{missionDesc}</p>
              </div>

              <div style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  <FiCompass />
                </div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{visionTitle}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{visionDesc}</p>
              </div>

              <div style={{ background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', marginBottom: '1rem' }}>
                  <FiShield />
                </div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{valuesTitle}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{valuesDesc}</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </>
  )
}
