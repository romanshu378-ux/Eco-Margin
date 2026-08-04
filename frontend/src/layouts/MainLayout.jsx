import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '@components/common/Navbar/Navbar'
import Footer from '@components/common/Footer/Footer'
import InstallAppButton from '@components/common/InstallAppButton/InstallAppButton'
import { pageTransition } from '@animations/variants'

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <motion.main 
        style={{ flex: 1, paddingTop: '80px' }} // 80px offset for fixed navbar
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <InstallAppButton placement="floating" />
    </div>
  )
}
