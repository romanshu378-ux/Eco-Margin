import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'

export default function FAQSection() {
  const faqs = [
    { q: 'Is EcoMargin compatible with my existing chargers?', a: 'Yes, if your chargers support OCPP 1.6J or 2.0.1, they can connect directly to our CSMS without any hardware modifications.' },
    { q: 'How does billing work for drivers?', a: 'Drivers can load money into their EcoMargin wallet via credit card or UPI. When a session ends, the exact amount is automatically deducted.' },
    { q: 'Can I set different tariffs for different times of the day?', a: 'Absolutely. Our platform supports complex Time-of-Use (ToU) tariffs, allowing you to charge more during peak hours.' },
    { q: 'What happens if a charger loses internet connection?', a: 'EcoMargin supports offline authorization via cached RFID lists. Once the connection is restored, offline CDRs are synced to the cloud.' }
  ]

  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section style={{ padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </motion.h2>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} variants={fadeUp}
              style={{ background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', color: 'var(--color-text)', fontSize: '1.125rem', fontWeight: '500' }}
              >
                {faq.q}
                <motion.span 
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  style={{ color: 'var(--color-primary)' }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
