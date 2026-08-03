import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PATHS } from './paths'

// Layouts
import MainLayout from '@layouts/MainLayout'
import AuthLayout from '@layouts/AuthLayout'

// Guards
import PublicRoute from './PublicRoute'

// Pages (Lazy loaded for performance)
const HomePage = lazy(() => import('@pages/Home/HomePage'))
const AboutPage = lazy(() => import('@pages/About/AboutPage'))
const ProductsPage = lazy(() => import('@pages/Products/ProductsPage'))
const ManufacturingPage = lazy(() => import('@pages/Manufacturing/ManufacturingPage'))
const SolutionsPage = lazy(() => import('@pages/Solutions/SolutionsPage'))
const ServicesPage = lazy(() => import('@pages/Services/ServicesPage'))
const ProjectsPage = lazy(() => import('@pages/Projects/ProjectsPage'))
const DealerPartnerPage = lazy(() => import('@pages/DealerPartner/DealerPartnerPage'))
const DownloadsPage = lazy(() => import('@pages/Downloads/DownloadsPage'))
const GalleryPage = lazy(() => import('@pages/Gallery/GalleryPage'))
const BlogsPage = lazy(() => import('@pages/Blogs/BlogsPage'))
const CareerPage = lazy(() => import('@pages/Career/CareerPage'))
const ContactPage = lazy(() => import('@pages/Contact/ContactPage'))
const PrivacyPage = lazy(() => import('@pages/Legal/PrivacyPage'))
const TermsPage = lazy(() => import('@pages/Legal/TermsPage'))
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'))

const LoginPage = lazy(() => import('@pages/Auth/LoginPage'))
const RegisterPage = lazy(() => import('@pages/Auth/RegisterPage'))

// Loading Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--color-primary)' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
)

export default function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Corporate Public Routes */}
        <Route element={<MainLayout />}>
          <Route path={PATHS.HOME} element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path={PATHS.ABOUT} element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path={PATHS.PRODUCTS} element={<Suspense fallback={<PageLoader />}><ProductsPage /></Suspense>} />
          <Route path={PATHS.MANUFACTURING} element={<Suspense fallback={<PageLoader />}><ManufacturingPage /></Suspense>} />
          <Route path={PATHS.SOLUTIONS} element={<Suspense fallback={<PageLoader />}><SolutionsPage /></Suspense>} />
          <Route path={PATHS.SERVICES} element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
          <Route path={PATHS.PROJECTS} element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
          <Route path={PATHS.DEALER_PARTNER} element={<Suspense fallback={<PageLoader />}><DealerPartnerPage /></Suspense>} />
          <Route path="/dealer" element={<Navigate to={PATHS.DEALER_PARTNER} replace />} />
          <Route path={PATHS.DOWNLOADS} element={<Suspense fallback={<PageLoader />}><DownloadsPage /></Suspense>} />
          <Route path={PATHS.GALLERY} element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />
          <Route path={PATHS.BLOGS} element={<Suspense fallback={<PageLoader />}><BlogsPage /></Suspense>} />
          <Route path={PATHS.CAREER} element={<Suspense fallback={<PageLoader />}><CareerPage /></Suspense>} />
          <Route path={PATHS.CONTACT} element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path={PATHS.PRIVACY} element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
          <Route path={PATHS.TERMS} element={<Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />
          <Route path={PATHS.NOT_FOUND} element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
        </Route>

        {/* Auth Routes */}
        <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
          <Route path={PATHS.LOGIN} element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
          <Route path={PATHS.REGISTER} element={<Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>} />
        </Route>

      </Routes>
    </AnimatePresence>
  )
}
