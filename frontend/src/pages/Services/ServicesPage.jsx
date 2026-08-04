// EcoMargin Frontend — Dynamic Services Page
// src/pages/Services/ServicesPage.jsx
import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import Button from '@components/ui/Button/Button'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { FiCheckCircle, FiTool, FiZap, FiActivity, FiShield } from 'react-icons/fi'
import publicApi from '../../services/publicApi'

const fallbackServices = [
  {
    title: '1. Site Feasibility & Power Load Survey',
    icon: <FiZap />,
    desc: 'Engineering assessment of electrical grid capacity, DISCOM sanctioned load, soil testing, and optimal station layout design.'
  },
  {
    title: '2. Civil & Structural Engineering',
    icon: <FiTool />,
    desc: 'Construction of reinforced concrete charger plinths, cable trenching, canopy structures, and protective bollards.'
  },
  {
    title: '3. Electrical Substation & Transformer Setup',
    icon: <FiZap />,
    desc: 'Installation of dedicated HT/LT transformers, compact substations, HT breakers, CT/PT metering, and copper earthing pits.'
  },
  {
    title: '4. Testing, Commissioning & Inspection',
    icon: <FiCheckCircle />,
    desc: 'Full power load bank testing, insulation resistance verification, insulation safety checks, and CEIG statutory approvals.'
  },
  {
    title: '5. OCPP CSMS Cloud Integration',
    icon: <FiActivity />,
    desc: 'Configuration of OCPP 1.6J/2.0.1 telemetry parameters, RFID card white-listing, payment gateway binding, and mobile app integration.'
  },
  {
    title: '6. Annual Maintenance Contracts (AMC)',
    icon: <FiShield />,
    desc: 'Comprehensive 24/7 NOC monitoring, preventative quarterly servicing, emergency field technician dispatch, and SLA uptime guarantees.'
  }
]

export default function ServicesPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [epcServices, setEpcServices] = useState(fallbackServices)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices()
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const liveSrv = res.data.map((s, idx) => ({
            title: s.title || s.name || `${idx + 1}. Service`,
            icon: idx % 2 === 0 ? <FiZap /> : <FiTool />,
            desc: s.description
          }))
          setEpcServices(liveSrv)
        }
      } catch (err) {
        console.warn('Services live fetch notice:', err.message)
      }
    }
    fetchServices()
  }, [])

  return (
    <>
      <SEO 
        title="Turnkey EPC Installation & AMC Services" 
        description="Turnkey EV charging station installation: site survey, civil & electrical work, transformer setup, commissioning, and AMC maintenance." 
      />
      
      <PageHeader 
        title="Turnkey EPC & AMC Services" 
        description="End-to-End Infrastructure Engineering — From DISCOM Grid Approvals to 24/7 Operation Support."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Turnkey Execution
          </span>
          <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontFamily: 'Outfit, sans-serif' }}>
            Complete EPC Infrastructure Lifecycle
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            EcoMargin handles every phase of EV Charging Station setup so you can launch your charging business with zero technical hassle.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}
        >
          {epcServices.map((srv, idx) => (
            <motion.div
              key={idx}
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
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                  {srv.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{srv.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{srv.desc}</p>
              </div>

              {/* Internal Linking Strip for Enterprise SEO */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem' }}>
                <Link to="/products" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Related Chargers →</Link>
                <Link to="/solutions" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Industry Solutions</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <div style={{ background: 'linear-gradient(135deg, #111827 0%, #151A2D 100%)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>Planning an EV Charging Station?</h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Book a site survey with our EPC engineering team. We will evaluate your grid capacity and provide a turnkey cost estimate.
          </p>
          <Button variant="primary" size="lg" onClick={() => setQuoteModalOpen(true)}>
            Schedule Site Survey / Get EPC Quote
          </Button>
        </div>

      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} defaultProduct="Turnkey EPC Installation" />
    </>
  )
}
