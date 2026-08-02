import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function IntroSection() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
            Who We Are
          </motion.h2>
          
          <motion.h3 variants={fadeUp} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '2rem', fontWeight: '500', lineHeight: '1.4' }}>
            EcoMargin bridges the gap between hardware manufacturers, operators, and EV drivers with a unified software ecosystem.
          </motion.h3>
          
          <motion.p variants={fadeUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', lineHeight: '1.8' }}>
            Born from the necessity of reliable infrastructure, we've built the most advanced cloud-based charging station management system. Whether you operate a single charger at a retail store or a nationwide fast-charging network, EcoMargin scales effortlessly to meet your demands while providing an unparalleled experience for drivers.
          </motion.p>

          <motion.div variants={fadeUp} style={{ marginTop: '3rem', width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--color-primary), transparent)', margin: '3rem auto 0' }} />
        </motion.div>
      </div>
    </section>
  )
}
