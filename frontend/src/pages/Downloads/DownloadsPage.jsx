// EcoMargin Frontend — Dynamic Technical Downloads Page
// src/pages/Downloads/DownloadsPage.jsx
import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import PageHeader from '@components/common/PageHeader/PageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import { FiDownload, FiFileText } from 'react-icons/fi'
import publicApi from '../../services/publicApi'

const fallbackDownloadsList = [
  {
    category: 'Product Technical Datasheets (PDF)',
    files: [
      { name: 'EcoWall 7.4kW AC Single Phase Charger Specification Sheet', size: '1.2 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/7.4kW-AC.pdf' },
      { name: 'EcoWall 22kW Dual Gun AC Charger Spec & CAD Drawing', size: '1.8 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/22kW-AC.pdf' },
      { name: 'EcoCharge 30kW DC Fast Charger Technical Manual', size: '2.5 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/30kW-DC.pdf' },
      { name: 'EcoCharge 60kW Dual CCS2 DC Charger Brochure & Wiring Diagram', size: '3.1 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/60kW-DC.pdf' },
      { name: 'EcoCharge 120kW / 160kW Ultra-Fast DC Station Specification', size: '4.2 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/120kW-DC.pdf' },
      { name: 'EcoCharge 240kW Heavy Duty Bus & Truck Charger Spec Sheet', size: '4.8 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/240kW-DC.pdf' }
    ]
  },
  {
    category: 'Certifications & Compliance Reports',
    files: [
      { name: 'ARAI Test Compliance Certificate (AIS 138 Part 1 & 2)', size: '2.1 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/arai-ais138.pdf' },
      { name: 'ISO 9001:2015 Quality Management System Certificate', size: '1.4 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/iso9001.pdf' },
      { name: 'CE Mark Electrical Safety Test Declaration', size: '1.1 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/ce-mark.pdf' },
      { name: 'IP55 / IP65 Weatherproof & Ingress Protection Test Report', size: '2.9 MB', type: 'PDF', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/ip65-report.pdf' }
    ]
  }
]

export default function DownloadsPage() {
  const [downloadsList, setDownloadsList] = useState(fallbackDownloadsList)

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await publicApi.getDownloads()
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const liveFiles = res.data.map(d => ({
            name: d.name,
            size: d.size || d.file_size || '1.5 MB',
            type: 'PDF',
            fileUrl: d.fileUrl || d.file_url || '#'
          }))

          setDownloadsList([
            {
              category: 'Live Technical Datasheets & Compliance Certificates',
              files: liveFiles
            }
          ])
        }
      } catch (err) {
        console.warn('Downloads live fetch notice:', err.message)
      }
    }
    fetchDownloads()
  }, [])

  return (
    <>
      <SEO 
        title="Technical Datasheets & ARAI Certificates" 
        description="Download technical specification sheets, ARAI/CE test certificates, and EPC installation manuals for EcoMargin EV Chargers." 
      />

      <PageHeader 
        title="Technical Downloads & Certificates" 
        description="Access Certified Test Reports, CAD Drawings, Installation Manuals, and Official Product Datasheets."
      />

      <div className="container" style={{ padding: '5rem 0' }}>
        
        {downloadsList.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', color: 'var(--color-primary)' }}>
              {section.category}
            </h2>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}
            >
              {section.files.map((file, fIdx) => (
                <motion.div
                  key={fIdx}
                  variants={fadeUp}
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.75rem', color: 'var(--color-primary)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                      <FiFileText />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>{file.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{file.type} • {file.size}</div>
                    </div>
                  </div>

                  <a 
                    href={file.fileUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!file.fileUrl || file.fileUrl === '#') {
                        e.preventDefault()
                        alert(`Downloading ${file.name}...`)
                      }
                    }}
                    style={{
                      background: 'var(--color-primary)',
                      color: '#0f0f1a',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      textDecoration: 'none'
                    }}
                  >
                    <FiDownload /> Download
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}

      </div>
    </>
  )
}
