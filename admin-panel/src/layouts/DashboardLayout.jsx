// EcoMargin Admin Panel — Dashboard Layout (Enterprise Product & Service CMS Edition)
// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiBox, FiList, FiFileText, FiImage, 
  FiBriefcase, FiUsers, FiMail, FiMessageSquare, 
  FiSettings, FiSearch, FiFolder, FiLogOut, FiInbox, 
  FiSliders, FiGlobe, FiDownload, FiLayers, FiTool
} from 'react-icons/fi';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard Analytics', path: '/', icon: <FiHome /> }
      ]
    },
    {
      title: 'DYNAMIC CONTENT CMS',
      items: [
        { name: 'Homepage CMS', path: '/cms/home', icon: <FiSliders /> },
        { name: 'About Page CMS', path: '/cms/about', icon: <FiLayers /> },
        { name: 'Footer & Contact CMS', path: '/cms/footer', icon: <FiGlobe /> },
        { name: 'SEO & Schema Manager', path: '/seo', icon: <FiSearch /> },
        { name: 'Media Manager (Cloudinary)', path: '/media', icon: <FiFolder /> }
      ]
    },
    {
      title: 'CATALOG & SERVICES',
      items: [
        { name: 'EV Chargers Spectrum', path: '/products', icon: <FiBox /> },
        { name: 'Services & EPC CMS', path: '/cms/services', icon: <FiTool /> },
        { name: 'Industries & Sectors', path: '/cms/industries', icon: <FiBriefcase /> },
        { name: 'Product Categories', path: '/categories', icon: <FiList /> },
        { name: 'EPC Projects Portfolio', path: '/projects', icon: <FiBriefcase /> },
        { name: 'Downloads & Certificates', path: '/downloads', icon: <FiDownload /> },
        { name: 'Factory & Plant Gallery', path: '/gallery', icon: <FiImage /> },
        { name: 'Blogs & Insights', path: '/blogs', icon: <FiFileText /> }
      ]
    },
    {
      title: 'INQUIRIES & LEADS',
      items: [
        { name: 'RFQ Enquiries & Leads', path: '/contact', icon: <FiInbox /> },
        { name: 'Newsletter Subscribers', path: '/newsletter', icon: <FiMessageSquare /> }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'Website Settings', path: '/settings', icon: <FiSettings /> },
        { name: 'Users & Permissions', path: '/users', icon: <FiUsers /> }
      ]
    }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '265px', background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0, fontWeight: 800 }}>EcoMargin</h2>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enterprise CMS Platform</div>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                {section.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {section.items.map((item, iIdx) => (
                  <NavLink
                    key={`${item.path}-${iIdx}`}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', 
                      borderRadius: 'var(--radius-md)', color: isActive ? '#fff' : 'var(--text-muted)',
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.825rem', fontWeight: 500
                    })}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
        <header className="header" style={{ padding: '1rem 2rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>EcoMargin Enterprise CMS Control Center</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name || 'Super Admin'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role || 'Administrator'}</div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Logout">
              <FiLogOut />
            </button>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
