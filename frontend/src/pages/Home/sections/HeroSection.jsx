// EcoMargin Frontend — Dynamic Hero Section Component
// src/pages/Home/sections/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowRight, 
  FiMapPin, 
  FiZap, 
  FiActivity, 
  FiClock, 
  FiPlayCircle, 
  FiUser, 
  FiCreditCard, 
  FiHelpCircle, 
  FiCpu, 
  FiCloud, 
  FiShield, 
  FiTrendingUp, 
  FiSun,
  FiSearch
} from 'react-icons/fi'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'
import publicApi from '../../../services/publicApi'
import './hero.css'

export default function HeroSection() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [searchLocation, setSearchLocation] = useState('')

  const [heroCMS, setHeroCMS] = useState({
    heroTitle: "Smarter Charging.\nGreener Tomorrow.",
    heroSubtitle: "EcoMargin delivers reliable, intelligent, and scalable EV charging solutions with integrated hardware and software — powering a cleaner and connected future.",
    heroVideoUrl: "",
    background_video_url: "",
    primaryButtonText: "Explore Solutions",
    secondaryButtonText: "View Products",
    brochureButtonText: "Brochures",
    stats: [
      { label: "Charging Points", value: "500+" },
      { label: "Locations", value: "100+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Support", value: "24/7" }
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

  const handleLocationSubmit = (e) => {
    e.preventDefault()
    if (searchLocation.trim()) {
      navigate(`/solutions?location=${encodeURIComponent(searchLocation.trim())}`)
    } else {
      navigate('/solutions')
    }
  }

  // Parse title into line 1 and line 2 for dual-tone display
  const titleText = heroCMS.heroTitle || "Smarter Charging.\nGreener Tomorrow."
  let line1 = "Smarter Charging."
  let line2 = "Greener Tomorrow."

  if (titleText.includes('\n')) {
    const parts = titleText.split('\n')
    line1 = parts[0]
    line2 = parts.slice(1).join(' ')
  } else if (titleText.includes('.')) {
    const parts = titleText.split('.')
    if (parts.length >= 2 && parts[1].trim()) {
      line1 = parts[0] + '.'
      line2 = parts.slice(1).join('.').trim()
    } else {
      line1 = titleText
      line2 = "Greener Tomorrow."
    }
  } else if (titleText !== "Smarter Charging.\nGreener Tomorrow.") {
    line1 = titleText
    line2 = ""
  }

  // Determine fallback stats with icons
  const statIcons = [<FiZap key="1" />, <FiMapPin key="2" />, <FiActivity key="3" />, <FiClock key="4" />]
  const displayStats = (heroCMS.stats && heroCMS.stats.length > 0) ? heroCMS.stats : [
    { label: "Charging Points", value: "500+" },
    { label: "Locations", value: "100+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Support", value: "24/7" }
  ]

  return (
    <>
      <section className="hero-wrapper" aria-label="Hero Section">
        <div className="hero-container">
          <div className="hero-grid">
            
            {/* Left Content Column */}
            <motion.div 
              className="hero-content"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              
              {/* 1. Top Pill Badge */}
              <motion.div variants={fadeUp} className="hero-badge">
                <span className="hero-badge-text">🚀 App &amp; Website Ready</span>
              </motion.div>

              {/* 2. Main Headline */}
              <motion.h1 variants={fadeUp} className="hero-headline">
                {line1}
                {line2 && <span className="hero-headline-accent">{line2}</span>}
              </motion.h1>

              {/* 3. Hero Description */}
              <motion.p variants={fadeUp} className="hero-description">
                {heroCMS.heroSubtitle || "EcoMargin delivers reliable, intelligent, and scalable EV charging solutions with integrated hardware and software — powering a cleaner and connected future."}
              </motion.p>

              {/* 4. Action CTAs */}
              <motion.div variants={fadeUp} className="hero-cta-group">
                <Link to="/solutions" className="btn-primary-hero">
                  {heroCMS.primaryButtonText ? heroCMS.primaryButtonText.replace(' →', '') : "Explore Solutions"} <FiArrowRight />
                </Link>

                <Link to="/products" className="btn-secondary-hero">
                  {heroCMS.secondaryButtonText ? heroCMS.secondaryButtonText.replace(' →', '') : "View Products"} <FiArrowRight />
                </Link>
              </motion.div>

              {/* 5. Statistics Grid */}
              <motion.div variants={fadeUp} className="hero-stats-grid">
                {displayStats.slice(0, 4).map((stat, idx) => (
                  <div key={idx} className="hero-stat-card">
                    <div className="hero-stat-header">
                      <span className="hero-stat-icon">
                        {statIcons[idx % statIcons.length]}
                      </span>
                      <span className="hero-stat-value">{stat.value}</span>
                    </div>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>

            {/* Right Visual Composition & Floating Card Column */}
            <motion.div 
              className="hero-visual-wrapper"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="hero-media-card">
                {cacheBustedVideoUrl ? (
                  <video
                    ref={videoRef}
                    key={rawVideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/hero-ev-composition.jpg"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="hero-media-video"
                  >
                    <source src={cacheBustedVideoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src="/hero-ev-composition.jpg" 
                    alt="EcoMargin Fast EV Charging Station Composition" 
                    className="hero-media-img" 
                  />
                )}
              </div>

              {/* Floating "Find a Charger" Card */}
              <div className="charger-finder-card">
                <div className="charger-finder-header">
                  <span className="charger-finder-title">
                    <FiMapPin style={{ color: '#10B981' }} /> Find a Charger
                  </span>
                  <span className="charger-finder-status">● Network Active</span>
                </div>

                <form onSubmit={handleLocationSubmit} className="charger-finder-form">
                  <div className="charger-input-wrapper">
                    <FiSearch className="charger-input-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter location" 
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="charger-input" 
                      aria-label="Enter location to find chargers"
                    />
                  </div>
                  <button type="submit" className="charger-find-btn">
                    Find Nearby <FiArrowRight />
                  </button>
                </form>

                <div className="quick-actions-grid">
                  <Link to="/products" className="quick-action-item">
                    <FiPlayCircle className="quick-action-icon" />
                    <span>Start Session</span>
                  </Link>
                  <Link to="/login" className="quick-action-item">
                    <FiUser className="quick-action-icon" />
                    <span>My Sessions</span>
                  </Link>
                  <Link to="/services" className="quick-action-item">
                    <FiCreditCard className="quick-action-icon" />
                    <span>Payments</span>
                  </Link>
                  <Link to="/contact" className="quick-action-item">
                    <FiHelpCircle className="quick-action-icon" />
                    <span>Support</span>
                  </Link>
                </div>
              </div>

            </motion.div>

          </div>
        </div>

        {/* 6. Dark Green Premium Feature Strip */}
        <div className="feature-strip-wrapper">
          <div className="feature-strip-container">
            <div className="feature-strip-grid">
              
              <div className="feature-strip-item">
                <div className="feature-strip-icon-box">
                  <FiCpu />
                </div>
                <div className="feature-strip-content">
                  <span className="feature-strip-title">Reliable Hardware</span>
                  <span className="feature-strip-desc">Built for performance and safety</span>
                </div>
              </div>

              <div className="feature-strip-item">
                <div className="feature-strip-icon-box">
                  <FiCloud />
                </div>
                <div className="feature-strip-content">
                  <span className="feature-strip-title">Smart Software</span>
                  <span className="feature-strip-desc">Cloud-connected and future-ready</span>
                </div>
              </div>

              <div className="feature-strip-item">
                <div className="feature-strip-icon-box">
                  <FiShield />
                </div>
                <div className="feature-strip-content">
                  <span className="feature-strip-title">Secure &amp; Safe</span>
                  <span className="feature-strip-desc">Enterprise-grade security you can trust</span>
                </div>
              </div>

              <div className="feature-strip-item">
                <div className="feature-strip-icon-box">
                  <FiTrendingUp />
                </div>
                <div className="feature-strip-content">
                  <span className="feature-strip-title">Scalable Platform</span>
                  <span className="feature-strip-desc">Designed to grow with your needs</span>
                </div>
              </div>

              <div className="feature-strip-item">
                <div className="feature-strip-icon-box">
                  <FiSun />
                </div>
                <div className="feature-strip-content">
                  <span className="feature-strip-title">Sustainable Future</span>
                  <span className="feature-strip-desc">Driving clean energy for a better tomorrow</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Global RFQ Quote Modal */}
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
