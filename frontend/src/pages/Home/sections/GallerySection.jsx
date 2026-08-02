import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function GallerySection() {
  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            EcoMargin in Action
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            A glimpse into our beautifully crafted software interfaces.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', gridAutoRows: '250px' }}
        >
          {/* Item 1 - Wide */}
          <motion.div variants={fadeUp} style={{ gridColumn: '1 / -1', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>[Full Dashboard Map View Placeholder]</span>
          </motion.div>
          
          {/* Item 2 */}
          <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>[Mobile Wallet UI]</span>
          </motion.div>
          
          {/* Item 3 */}
          <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>[Analytics Chart UI]</span>
          </motion.div>
          
          {/* Item 4 */}
          <motion.div variants={fadeUp} style={{ background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>[Station Detail UI]</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
