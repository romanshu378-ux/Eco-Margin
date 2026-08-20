import React, { useState, useEffect } from 'react'
import SEO from '@seo/SEO'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import PageHeader from '@components/common/PageHeader/PageHeader'
import publicApi from '@services/publicApi'

const fallbackProjects = [
  { title: 'Delhi-Jaipur EV Superhighway Corridor', clientName: 'National Highway Logistics Management', location: 'NH-48 Corridor', capacity: '120kW Dual CCS2', timeline: 'Completed 2025', description: 'Turnkey EPC installation of 12 ultra-fast DC charging stations spanning 270 km along NH-48.', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80' },
  { title: 'Noida Metro Feeder E-Bus Depot', clientName: 'Delhi Metro Rail Corporation (DMRC)', location: 'Sector 51, Noida', capacity: '240kW High Power DC', timeline: 'Completed 2025', description: 'Heavy-duty DC charging infrastructure powering 50+ electric feeder buses with 99.8% uptime SLA.', imageUrl: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80' },
  { title: 'Gurugram Commercial Logistics Hub', clientName: 'Bluedart Logistics', location: 'Cyber City, Gurugram', capacity: '30kW LVDC & 60kW DC', timeline: 'Completed 2026', description: 'Overnight & fast charging facility for 100+ electric delivery vans operating 24/7.', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await publicApi.getProjects()
        if (res && res.data && res.data.length > 0) {
          setProjects(res.data)
        }
      } catch (err) {
        console.warn('Live projects fetch notice:', err.message)
      }
    }
    fetchLiveProjects()
  }, [])

  const handleImageError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }))
  }

  return (
    <>
      <SEO 
        title="EV Charging Projects & Infrastructure | EcoMargin LLP"
        description="Discover successful EV charging infrastructure deployments, highway fast-charging hubs, workplace charging setups, and commercial fleet depots by EcoMargin LLP."
        pageRoute="/projects"
      />
      
      <PageHeader title="Our Projects" subtitle="Powering electric mobility transitions across highway corridors, transit hubs and logistics networks." />

      <div className="container" style={{ padding: '6rem 0' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {projects.map((proj, i) => {
            const hasError = imgErrors[proj.id || i];
            const img = hasError ? null : (proj.imageUrl || proj.image_url || (Array.isArray(proj.images) ? proj.images[0] : ''));
            return (
              <motion.div 
                key={proj.id || i} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
                style={{ 
                  background: 'var(--color-bg-card)', 
                  borderRadius: 'var(--radius-xl)', 
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  transition: 'transform var(--transition-fast)',
                }}
              >
                <div style={{ height: '220px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {img ? (
                    <img src={img} alt={proj.title} onError={() => handleImageError(proj.id || i)} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'var(--color-text-muted)' }}>[EcoMargin EPC Project]</span>
                  )}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text)', backdropFilter: 'blur(4px)' }}>
                    {proj.capacity || proj.status || 'Completed'}
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  {proj.clientName && (
                    <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Client: {proj.clientName || proj.client_name}</p>
                  )}
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: '1.5' }}>{proj.description}</p>
                </div>
              </motion.div>
            )
          })}
          
        </motion.div>
      </div>
    </>
  )
}
