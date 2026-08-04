// EcoMargin Frontend — Dynamic Services Page
// src/pages/Services/ServicesPage.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@seo/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { 
  FiCheck, 
  FiCpu, 
  FiZap, 
  FiBriefcase, 
  FiShield, 
  FiCloud, 
  FiLayers, 
  FiCompass, 
  FiTruck,
  FiMapPin,
  FiShoppingBag,
  FiHome,
  FiHeart,
  FiAward,
  FiGlobe,
  FiBook,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'

export default function ServicesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Turnkey EPC Installation',
      icon: <FiBriefcase />,
      points: ['Site Survey', 'Electrical Design', 'Civil Work', 'Commissioning'],
      desc: 'Complete engineering procurement and construction solutions. We build dedicated transformer substations, handle cabling, trenching, and grid approvals.'
    },
    {
      id: 2,
      title: 'AC EV Charger Installation',
      icon: <FiCpu />,
      points: ['3.3kW', '7.4kW', '11kW', '22kW'],
      desc: 'Ideal for residences, apartments, and commercial parking spaces. Smart AC chargers with load balancing and cloud integration.'
    },
    {
      id: 3,
      title: 'DC Fast Charger Installation',
      icon: <FiZap />,
      points: ['30kW', '60kW', '120kW', '160kW', '240kW'],
      desc: 'Ultra-fast CCS2 DC charging infrastructure for highways, fleet hubs, and commercial stations with multi-gun outputs.'
    },
    {
      id: 4,
      title: 'Fleet Charging Solutions',
      icon: <FiTruck />,
      points: ['Bus Depots', 'Corporate Fleet', 'Taxi Fleet', 'Logistics'],
      desc: 'Tailored charging infrastructure for high-utilization commercial transport, maximizing fleet availability with smart scheduling.'
    },
    {
      id: 5,
      title: 'OCPP Cloud Software',
      icon: <FiCloud />,
      points: ['Remote Monitoring', 'RFID Billing', 'Mobile App', 'Load Management'],
      desc: 'Advanced central monitoring platform supporting smart billing algorithms, live diagnostic alerts, and open protocols (OCPP).'
    },
    {
      id: 6,
      title: 'Annual Maintenance Contract (AMC)',
      icon: <FiShield />,
      points: ['Preventive Maintenance', 'Emergency Support', 'Health Check', 'Remote Diagnostics'],
      desc: 'Comprehensive protection plans guaranteeing up to 99% charger uptime, regular safety checks, and priority field service SLA.'
    },
    {
      id: 7,
      title: 'OEM Manufacturing',
      icon: <FiLayers />,
      points: ['Private Label Chargers', 'PCB Design', 'Controller Integration', 'Testing'],
      desc: 'Customized private-label charger manufacturing, custom PCB layout configuration, and enclosure color branding for corporate clients.'
    },
    {
      id: 8,
      title: 'Consulting & Energy Planning',
      icon: <FiCompass />,
      points: ['Load Calculation', 'Transformer Planning', 'Solar Integration', 'Battery Storage'],
      desc: 'Detailed energy planning, grid load analysis, and hybrid green energy microgrid consultations integrating solar and storage.'
    }
  ]

  const industries = [
    { name: 'Highways', icon: <FiMapPin /> },
    { name: 'Shopping Malls', icon: <FiShoppingBag /> },
    { name: 'Hotels', icon: <FiHome /> },
    { name: 'Hospitals', icon: <FiHeart /> },
    { name: 'Corporate Offices', icon: <FiBriefcase /> },
    { name: 'Factories', icon: <FiCpu /> },
    { name: 'Residential Societies', icon: <FiHome /> },
    { name: 'Government Projects', icon: <FiAward /> },
    { name: 'Petrol Pumps', icon: <FiGlobe /> },
    { name: 'Educational Institutes', icon: <FiBook /> },
    { name: 'Fleet Operators', icon: <FiTruck /> }
  ]

  const stats = [
    { value: '500+', label: 'Charging Points' },
    { value: '99%', label: 'Uptime SLA' },
    { value: '24/7', label: 'NOC Support' },
    { value: '10+', label: 'States Served' }
  ]

  const timelineSteps = [
    { step: '01', title: 'Requirement Analysis', desc: 'Detailed consult to align on site charger specifications and layout constraints.' },
    { step: '02', title: 'Site Survey', desc: 'Civil and electrical feasibility analysis verifying grid load capacity.' },
    { step: '03', title: 'Quotation', desc: 'Transparent, upfront commercial pricing for equipment and EPC installation.' },
    { step: '04', title: 'Installation', desc: 'Execution of civil, trenching, electrical earthing, and charger mounting.' },
    { step: '05', title: 'Testing', desc: 'Load bank validation and safety checklist clearance.' },
    { step: '06', title: 'Commissioning', desc: 'Central CSMS configuration, live telemetry integration, and official handover.' },
    { step: '07', title: 'Lifetime Support', desc: 'AMC protection, remote debugging, and field technician servicing.' }
  ]

  const faqs = [
    { 
      question: 'How long does installation take?', 
      answer: 'Standard AC charger installation takes 2-4 days. High-capacity DC fast charging substations typically require 2-4 weeks, including civil work, transformer allocation, DISCOM permissions, and CEIG approvals.' 
    },
    { 
      question: 'Do you provide OCPP?', 
      answer: 'Yes, all EcoMargin chargers and our cloud software support OCPP 1.6J and OCPP 2.0.1 protocols to ensure seamless billing integrations, live diagnostic capabilities, and load management.' 
    },
    { 
      question: 'Do you provide AMC?', 
      answer: 'Yes, we offer custom Annual Maintenance Contracts (AMC) featuring up to 99% uptime guarantees, scheduled quarterly safety checks, and remote network operations center (NOC) troubleshooting.' 
    },
    { 
      question: 'Can EcoMargin manufacture chargers?', 
      answer: 'Yes, as a leading EV charger manufacturer, we offer OEM and private label manufacturing services with customized branding, custom enclosure wraps, and tailored controller integrations.' 
    },
    { 
      question: 'Do you install DC Fast Chargers?', 
      answer: 'Yes, we supply and install turnkey DC fast chargers from 30kW up to 240kW, handling HT/LT transformer substations, metering, safety panels, earthing pits, and civil structures.' 
    }
  ]

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <>
      <SEO 
        title="EV Charging Installation Services | EcoMargin" 
        description="EcoMargin offers turnkey EV charging installation, EPC services, AC/DC charger deployment, OCPP software, fleet charging solutions and annual maintenance across India."
        faqs={faqs}
      />

      {/* Hero Section */}
      <section 
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(18, 18, 26, 0.98) 100%)',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '6rem 0 4rem 0',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        {/* Background Image Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', background: 'var(--color-primary-light)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
              EV Infrastructure Services
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit', fontWeight: 800, lineHeight: 1.1, color: '#ffffff' }}>
              Powering India's EV Infrastructure
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Complete End-to-End EV Charging Solutions for Homes, Businesses, Industries and Government Projects.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={() => setQuoteModalOpen(true)}>
                Request Quote
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Professional Execution
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Our Services
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              From initial consulting and power utility coordination to layout installation and lifetime telemetry monitoring.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {services.map((srv) => (
              <motion.div
                key={srv.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                  {srv.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: 0, fontFamily: 'Outfit', fontWeight: 700 }}>{srv.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {srv.desc}
                </p>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {srv.points.map((pt, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          fontSize: '0.75rem', 
                          background: 'var(--color-bg-alt)', 
                          color: 'var(--color-text)', 
                          padding: '0.25rem 0.65rem', 
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <FiCheck style={{ color: 'var(--color-primary)' }} /> {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Target Segments
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Industries We Serve
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              We design specialized EV solutions tailored to the load profiles and regulatory needs of diverse sectors.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {industries.map((ind, i) => (
              <div 
                key={i}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                  {ind.icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Statistics */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Our Track Record
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Why Choose EcoMargin
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Unrivaled deployment scales, industrial compliance standards, and reliable operation support models.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem'
            }}
          >
            {stats.map((st, i) => (
              <div 
                key={i}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Glow ring */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(0, 200, 150, 0.03) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }}
                />
                <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', margin: '0 0 0.5rem 0', fontFamily: 'Outfit', fontWeight: 800 }}>
                  {st.value}
                </h3>
                <span style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '1rem' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Timeline */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Execution Workflow
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Service Process Timeline
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              A systematic, multi-stage integration model tracking every layout phase from load audits to commissioning.
            </p>
          </div>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Timeline Line */}
            <div 
              style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                bottom: '20px',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--color-primary) 0%, var(--color-border) 100%)'
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timelineSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
                  {/* Circle Pin */}
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--color-bg-card)',
                      border: '2px solid var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      flexShrink: 0,
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {step.step}
                  </div>
                  
                  {/* Step content */}
                  <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', margin: '0 0 0.5rem 0', fontFamily: 'Outfit' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Help & Support
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      color: 'var(--color-text)',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <FiChevronUp size={20} style={{ color: 'var(--color-primary)' }} /> : <FiChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(16, 22, 35, 0.9) 0%, rgba(22, 30, 48, 0.95) 100%)', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-xl)', 
              padding: '4rem 2rem', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1rem', color: '#ffffff', fontFamily: 'Outfit', fontWeight: 800 }}>
              Ready to Build Your EV Charging Infrastructure?
            </h2>
            <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
              Speak with our core energy engineering team to plan your site feasibility audit, DISCOM grid approval, and charger deployment layout.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={() => setQuoteModalOpen(true)}>
                Request Quote
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Quote Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        defaultProduct="EV Infrastructure EPC Services"
      />
    </>
  )
}
