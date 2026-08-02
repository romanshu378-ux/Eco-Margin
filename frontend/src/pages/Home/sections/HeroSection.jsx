import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@components/ui/Button/Button'
import { PATHS } from '@routes/paths'
import { fadeUp, staggerContainer, slideInRight } from '@animations/variants'

export default function HeroSection() {
  return (
    <section style={{ 
      minHeight: '90vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0'
    }}>
      {/* Background Gradients */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1 }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 230, 172, 0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1 }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: '500' }}>
              <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
              Intelligent EV Management Platform
            </motion.div>
            
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Powering the <br />
              <span className="text-gradient">Electric Future.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: '1.6' }}>
              EcoMargin offers an end-to-end management solution for EV charging networks. Monitor, monetize, and scale your infrastructure seamlessly.
            </motion.p>
            
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={PATHS.REGISTER}>
                <Button size="lg" variant="primary">Start Free Trial</Button>
              </Link>
              <Link to={PATHS.CONTACT}>
                <Button size="lg" variant="outline">Book Demo</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ position: 'relative' }}>
            <div className="glass-panel" style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', padding: '1rem', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
              {/* Abstract Dashboard UI Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: '30%', height: '8px', background: 'var(--color-text-muted)', borderRadius: '4px' }} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', background: 'var(--color-error)', borderRadius: '50%' }} />
                  <div style={{ width: '8px', height: '8px', background: 'var(--color-warning)', borderRadius: '50%' }} />
                  <div style={{ width: '8px', height: '8px', background: 'var(--color-success)', borderRadius: '50%' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, height: '80px', background: 'var(--color-bg)', borderRadius: '12px' }} />
                <div style={{ flex: 1, height: '80px', background: 'var(--color-bg)', borderRadius: '12px' }} />
                <div style={{ flex: 1, height: '80px', background: 'var(--color-primary-light)', borderRadius: '12px', border: '1px solid var(--color-primary)' }} />
              </div>

              <div style={{ flex: 1, background: 'var(--color-bg)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  style={{ position: 'absolute', bottom: 0, left: 0, height: '40%', background: 'linear-gradient(to top, var(--color-primary-light), transparent)' }}
                />
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', opacity: 0.5 }}>
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0 40 Q 20 20, 40 30 T 80 15 T 100 5 L 100 40 L 0 40" 
                    fill="var(--color-primary-light)" 
                    stroke="var(--color-primary)" 
                    strokeWidth="0.5" 
                  />
                </svg>
              </div>

              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ position: 'absolute', bottom: '2rem', right: '-1rem', background: 'var(--color-bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ width: '40px', height: '40px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>⚡</div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Revenue Today</div>
                  <div style={{ fontWeight: '700' }}>$4,250.00</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
