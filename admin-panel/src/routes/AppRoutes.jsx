// EcoMargin Admin Panel — App Routes
// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'

// Lazy loaded page components
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const HomepageCMSPage = lazy(() => import('../pages/CMS/HomepageCMSPage'))
const AboutCMSPage = lazy(() => import('../pages/CMS/AboutCMSPage'))
const ManufacturingCMSPage = lazy(() => import('../pages/CMS/ManufacturingCMSPage'))
const FooterCMSPage = lazy(() => import('../pages/CMS/FooterCMSPage'))
const DownloadsCMSPage = lazy(() => import('../pages/CMS/DownloadsCMSPage'))
const ServicesCMSPage = lazy(() => import('../pages/CMS/ServicesCMSPage'))
const IndustriesCMSPage = lazy(() => import('../pages/CMS/IndustriesCMSPage'))
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage'))
const CategoriesPage = lazy(() => import('../pages/Categories/CategoriesPage'))
const BlogsPage = lazy(() => import('../pages/Blogs/BlogsPage'))
const GalleryPage = lazy(() => import('../pages/Gallery/GalleryPage'))
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'))
const UsersPage = lazy(() => import('../pages/Users/UsersPage'))
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'))
const DealerApplicationsPage = lazy(() => import('../pages/Dealer/DealerApplicationsPage'))
const NewsletterPage = lazy(() => import('../pages/Newsletter/NewsletterPage'))
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'))
const SEOPage = lazy(() => import('../pages/SEO/SEOPage'))
const MediaPage = lazy(() => import('../pages/Media/MediaPage'))

// Fallback Loader
const Loader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh', 
    color: 'var(--primary)',
    fontWeight: '500'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }}></div>
      <span>Loading Enterprise Control Center...</span>
    </div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>

        {/* Protected Dashboard & Enterprise CMS Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/cms/home" element={<HomepageCMSPage />} />
          <Route path="/cms/homepage" element={<HomepageCMSPage />} />
          <Route path="/cms/about" element={<AboutCMSPage />} />
          <Route path="/cms/manufacturing" element={<ManufacturingCMSPage />} />
          <Route path="/cms/footer" element={<FooterCMSPage />} />
          <Route path="/cms/services" element={<ServicesCMSPage />} />
          <Route path="/cms/industries" element={<IndustriesCMSPage />} />
          <Route path="/industries" element={<IndustriesCMSPage />} />
          <Route path="/downloads" element={<DownloadsCMSPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/leads" element={<ContactPage />} />
          <Route path="/dealer-applications" element={<DealerApplicationsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/newsletters" element={<NewsletterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/seo" element={<SEOPage />} />
          <Route path="/cms/seo" element={<SEOPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Route>

        {/* Wildcard Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  )
}
