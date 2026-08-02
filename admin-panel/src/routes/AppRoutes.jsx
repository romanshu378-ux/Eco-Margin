import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy load pages for performance
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const ProductsPage = lazy(() => import('../pages/Products/ProductsPage'));
const CategoriesPage = lazy(() => import('../pages/Categories/CategoriesPage'));
const BlogsPage = lazy(() => import('../pages/Blogs/BlogsPage'));
const GalleryPage = lazy(() => import('../pages/Gallery/GalleryPage'));
const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const UsersPage = lazy(() => import('../pages/Users/UsersPage'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const NewsletterPage = lazy(() => import('../pages/Newsletter/NewsletterPage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const SEOPage = lazy(() => import('../pages/SEO/SEOPage'));
const MediaPage = lazy(() => import('../pages/Media/MediaPage'));

// Loader
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '3rem' }}>
    <div style={{ color: 'var(--primary)' }}>Loading...</div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/seo" element={<SEOPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Route>
        
      </Routes>
    </Suspense>
  );
}
