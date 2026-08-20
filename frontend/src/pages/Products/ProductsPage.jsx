// EcoMargin Frontend — Dynamic Products Catalog Page
// src/pages/Products/ProductsPage.jsx
import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'
import QuoteModal from '@components/common/QuoteModal/QuoteModal'
import { FiDownload, FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import publicApi from '../../services/publicApi'

const fallbackCategories = [
  {
    category: 'Commercial AC Chargers (3.3kW to 22kW)',
    description: 'Smart Destination Chargers for Offices, Hotels, Residential Societies, and Malls.',
    items: [
      {
        name: 'EcoWall 7.4kW AC Single Phase Charger',
        power: '7.4kW (230V AC, 32A)',
        connector: 'Type 2 Gun (IEC 62196-2) with 5m Cable',
        protection: 'IP55 Outdoor Weatherproof / IK10 Impact Rated',
        efficiency: '>98%',
        warranty: '3 Years Standard Warranty',
        features: ['OCPP 1.6J / 2.0.1 Protocol Compliant', 'RFID & Mobile App Auth', 'Dynamic Load Balancing (DLM)', 'Compact Aluminum Enclosure'],
        applications: 'Residential Apartments, Hotel Parking, Office Garages'
      },
      {
        name: 'EcoWall 22kW Dual Gun AC Charger',
        power: '22kW (415V AC 3-Phase, 32A per gun)',
        connector: 'Dual Type 2 Guns (Simultaneous Charging)',
        protection: 'IP55 / IK10 Metallic Enclosure',
        efficiency: '>98%',
        warranty: '3 Years Standard Warranty',
        features: ['Dual Output Independent Metering', '7-inch Touchscreen Display', '4G / Wi-Fi / Ethernet Connectivity', 'MID Certified Energy Meter'],
        applications: 'Commercial Complexes, Public Parking, Shopping Malls'
      }
    ]
  },
  {
    category: 'Heavy-Duty DC Fast Chargers (20kW to 240kW)',
    description: 'Ultra-Fast Direct Current Charging Stations for Highways, Commercial Fleets, and Bus Depots.',
    items: [
      {
        name: 'EcoCharge 30kW DC Fast Charger',
        power: '30kW Constant Power (200V–1000V DC)',
        connector: 'Single CCS2 Gun (GB/T or CHAdeMO Option)',
        protection: 'IP55 Stainless Steel Enclosure',
        efficiency: '≥96% Peak Efficiency',
        warranty: '2 Years Factory Warranty (Extendable)',
        features: ['Compact Footprint (Wall or Floor Mount)', 'Low Standby Power Consumption', 'Over-Voltage, Short-Circuit & Surge Protection', 'Integrated POS & RFID Reader'],
        applications: 'Commercial Fleets, Logistics Hubs, Small Commercial Depots'
      },
      {
        name: 'EcoCharge 60kW Dual Gun DC Station',
        power: '60kW Dynamic Split (30kW + 30kW or 60kW Single)',
        connector: 'Dual CCS2 Heavy Duty Guns',
        protection: 'IP55 Weatherproof Outdoor Cabinet',
        efficiency: '≥95% High Efficiency Modules',
        warranty: '3 Years Comprehensive Warranty',
        features: ['Dynamic Power Matrix Allocation', 'Liquid-Cooled Cable Option', 'Remote OTA Firmware Upgrades', '24/7 NOC Cloud Diagnostics'],
        applications: 'Highway Fuel Stations, City Hubs, Fleet Depots'
      },
      {
        name: 'EcoCharge 120kW / 160kW Ultra-Fast DC Station',
        power: '120kW / 160kW Dual Gun Station',
        connector: 'Dual CCS2 Guns (Cooled Cable Rated to 400A)',
        protection: 'IP55 Outdoor Vandal Resistant',
        efficiency: '≥96% Efficiency at Full Load',
        warranty: '3 Years On-Site Comprehensive AMC Included',
        features: ['Charges 0 to 80% in Under 25 Mins', '10-inch Full HD Interactive Display', 'Isolation Transformer Protection Built-in', 'Class 0.5 Revenue Grade Meter'],
        applications: 'Expressways, Public Charging Operators (CPOs), EV Bus Stations'
      },
      {
        name: 'EcoCharge 240kW Heavy Duty Depot Charger',
        power: '240kW Ultra Heavy Duty DC Matrix',
        connector: 'Dual CCS2 Guns / Overhead Pantograph Interface',
        protection: 'IP55 Industrial Grade Cabinet',
        efficiency: '≥96.5% Modular Efficiency',
        warranty: '5 Years Enterprise EPC Support',
        features: ['Designed for E-Buses and Heavy Commercial Trucks', 'High Power Modular Hot-Swappable Units', 'Grid Harmonic Reduction Filters', 'Smart Peak-Shaving Integration'],
        applications: 'State Bus Transport Depots, Mining Fleets, Logistics Depots'
      }
    ]
  }
]

export default function ProductsPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productCategories, setProductCategories] = useState(fallbackCategories)

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await publicApi.getProducts()
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Group flat products list into categories dynamically
          const acItems = res.data.filter(p => p.category === 'AC EV Chargers').map(p => ({
            name: p.name,
            power: p.power,
            connector: p.connector || 'Type 2 Gun',
            protection: p.protection || 'IP55 Outdoor',
            efficiency: p.efficiency || '>98%',
            warranty: p.warranty || '3 Years Warranty',
            features: ['OCPP Protocol Compliant', 'RFID Auth', 'Dynamic Load Balancing'],
            applications: p.applications || 'Apartments, Hotels, Offices'
          }))

          const dcItems = res.data.filter(p => p.category !== 'AC EV Chargers').map(p => ({
            name: p.name,
            power: p.power,
            connector: p.connector || 'Dual CCS2',
            protection: p.protection || 'IP55 Outdoor Cabinet',
            efficiency: p.efficiency || '≥96%',
            warranty: p.warranty || '3 Years AMC Included',
            features: ['Dynamic Power Matrix Split', 'Liquid-Cooled Cable Option', '24/7 NOC Cloud Diagnostics'],
            applications: p.applications || 'Highways, Bus Depots, Fleet Hubs'
          }))

          const liveCategories = []
          if (acItems.length > 0) {
            liveCategories.push({
              category: 'Commercial AC Chargers (3.3kW to 22kW)',
              description: 'Smart Destination Chargers for Offices, Hotels, Residential Societies, and Malls.',
              items: acItems
            })
          }
          if (dcItems.length > 0) {
            liveCategories.push({
              category: 'Heavy-Duty DC Fast Chargers (20kW to 240kW)',
              description: 'Ultra-Fast Direct Current Charging Stations for Highways, Commercial Fleets, and Bus Depots.',
              items: dcItems
            })
          }

          if (liveCategories.length > 0) {
            setProductCategories(liveCategories)
          }
        }
      } catch (err) {
        console.warn('Products live fetch notice:', err.message)
      }
    }
    fetchLiveProducts()
  }, [])

  const handleOpenQuote = (productName) => {
    setSelectedProduct(productName)
    setQuoteModalOpen(true)
  }

  const allProductsList = productCategories.flatMap((cat, catIdx) => 
    cat.items.map((prod, idx) => ({
      id: `prod-${catIdx}-${idx}`,
      name: prod.name,
      description: `${prod.name} manufactured by EcoMargin. Specifications: Connector: ${prod.connector}, Protection: ${prod.protection}, Efficiency: ${prod.efficiency}, Warranty: ${prod.warranty}. Features: ${prod.features.join(', ')}. Applications: ${prod.applications}.`,
      power: prod.power,
      sku: `EM-PROD-${catIdx}-${idx}`,
      price: 'Call for Quote'
    }))
  );

  const productFaqs = [
    { question: 'Are EcoMargin EV chargers safety compliant?', answer: 'Yes, our complete charger range (both AC type 2 destination chargers and DC Fast CCS2 charging stations) meet all applicable safety regulations.' },
    { question: 'What is the warranty period for commercial chargers?', answer: 'We offer a standard 3-year manufacturer warranty on all commercial AC and DC charging hardware, which can be extended via customized AMC packages.' },
    { question: 'Do you provide dynamic load management (DLM)?', answer: 'Yes, our smart OCPP 1.6J and 2.0.1 compliant chargers support dynamic load balancing to protect building grid limits and optimize fleet dispatch.' }
  ];

  return (
    <>
      <SEO 
        title="EV Charger Product Range (3.3kW to 240kW)" 
        description="Commercial AC chargers & ultra-fast DC charging stations manufactured in India with built-in safety protection." 
        products={allProductsList}
        faqs={productFaqs}
      />
      
      <PageHeader 
        title="Industrial EV Charger Spectrum" 
        description="Engineering high-uptime AC & DC Fast Chargers (3.3kW to 240kW) for CPOs, Fleets, and Commercial Infrastructure."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        {/* Category Blocks */}
        {productCategories.map((cat, catIdx) => (
          <div key={catIdx} style={{ marginBottom: '6rem' }}>
            <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Manufacturing Division
              </span>
              <h2 style={{ fontSize: '2.25rem', marginTop: '0.25rem', fontFamily: 'Outfit, sans-serif' }}>{cat.category}</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{cat.description}</p>
            </div>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}
            >
              {cat.items.map((prod, pIdx) => (
                <motion.div
                  key={pIdx}
                  variants={fadeUp}
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                      OEM SPECIFICATION
                    </span>

                    <h3 style={{ fontSize: '1.4rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>{prod.name}</h3>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                      {prod.power}
                    </div>

                    {/* Spec Table */}
                    <div style={{ background: 'var(--color-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Connector:</span>
                        <span style={{ fontWeight: 600 }}>{prod.connector}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Protection:</span>
                        <span style={{ fontWeight: 600 }}>{prod.protection}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Efficiency:</span>
                        <span style={{ fontWeight: 600 }}>{prod.efficiency}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Warranty:</span>
                        <span style={{ fontWeight: 600 }}>{prod.warranty}</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                        Key Technical Features:
                      </h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiCheckCircle style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <Button variant="primary" fullWidth onClick={() => handleOpenQuote(prod.name)}>
                      Request Commercial Quote
                    </Button>
                    <Link to="/downloads" style={{ width: '100%' }}>
                      <Button variant="outline" fullWidth style={{ fontSize: '0.85rem' }}>
                        <FiDownload style={{ marginRight: '0.5rem' }} /> Download Datasheet (PDF)
                      </Button>
                    </Link>

                    {/* Internal Linking Strip for Enterprise SEO */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', color: 'var(--color-text-muted)' }}>
                      <Link to="/services" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>EPC Services</Link> • 
                      <Link to="/downloads" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Datasheets</Link> • 
                      <Link to="/projects" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Deployed Projects</Link> • 
                      <Link to="/contact" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Factory Inquiry</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}

        {/* Dynamic FAQ Accordion */}
        <div style={{ marginTop: '6rem', background: 'var(--color-bg-card)', padding: '4rem 3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {productFaqs.map((faq, idx) => (
              <div key={idx} style={{ borderTop: idx > 0 ? '1px solid var(--color-border)' : 'none', paddingTop: idx > 0 ? '1.5rem' : '0' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{faq.question}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} defaultProduct={selectedProduct} />
    </>
  );
}
