import React from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import Button from '@components/ui/Button/Button'

export default function CareerPage() {
  const jobs = [
    { title: 'Senior Backend Engineer (Node.js)', type: 'Full-time', location: 'Remote / Mumbai', dept: 'Engineering' },
    { title: 'Frontend Developer (React)', type: 'Full-time', location: 'Remote', dept: 'Engineering' },
    { title: 'Hardware Integration Specialist', type: 'Full-time', location: 'Pune, India', dept: 'Operations' },
    { title: 'Enterprise Account Executive', type: 'Full-time', location: 'London, UK', dept: 'Sales' }
  ]

  return (
    <>
      <SEO title="Careers" description="Join EcoMargin and help build the software powering the electric revolution." />
      
      <PageHeader 
        title="Careers at EcoMargin" 
        description="Help us build the software powering the global electric revolution."
      />

      <div className="container" style={{ padding: '6rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Open Positions</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            We're always looking for talented individuals who are passionate about sustainability and technology.
          </p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          {jobs.map((job, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ x: 5, borderColor: 'var(--color-primary-light)' }}
              style={{ 
                background: 'var(--color-bg-card)', 
                padding: '2rem', 
                borderRadius: 'var(--radius-lg)', 
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <span>{job.dept}</span> • <span>{job.type}</span> • <span>{job.location}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Apply Now</Button>
            </motion.div>
          ))}
        </motion.div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--color-text-muted)' }}>
          Don't see a perfect fit? Send your resume to <a href="mailto:careers@ecomargin.com" style={{ color: 'var(--color-primary)' }}>careers@ecomargin.com</a>
        </div>
      </div>
    </>
  )
}
