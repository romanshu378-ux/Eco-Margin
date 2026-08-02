// EcoMargin Frontend — Dynamic Counter Stats Section
// src/pages/Home/sections/CounterSection.jsx
import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@animations/variants'
import { useHomepage } from '../../../hooks/useCMS'

function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const startValue = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - startValue) + startValue))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [isInView, end, duration])

  return { count, ref }
}

const StatItem = ({ end, suffix, label }) => {
  const { count, ref } = useCounter(end)
  
  return (
    <motion.div ref={ref} variants={fadeUp} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '1.125rem' }}>{label}</div>
    </motion.div>
  )
}

export default function CounterSection() {
  const { data: homeData } = useHomepage()

  const stats = homeData?.stats || [
    { label: "AC & DC Fast Range", value: "3.3kW – 240kW" },
    { label: "Certified Factory", value: "ISO & ARAI" },
    { label: "Network Uptime", value: "99.8%" }
  ]

  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}
        >
          <StatItem end={15000} suffix="+" label="Connected Chargers" />
          <StatItem end={2.5} suffix="M" label="Charging Sessions" />
          <StatItem end={45} suffix="GWh" label="Energy Delivered" />
          <StatItem end={120} suffix="+" label={stats[0]?.label || "Partner Operators"} />
        </motion.div>
      </div>
    </section>
  )
}
