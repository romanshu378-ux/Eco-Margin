// EcoMargin Admin Panel — Dashboard Layout (Enterprise Product & Service CMS Edition)
// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiBox, FiList, FiFileText, FiImage, 
  FiBriefcase, FiUsers, FiMessageSquare, 
  FiSettings, FiSearch, FiFolder, FiLogOut, FiInbox, 
  FiSliders, FiGlobe, FiDownload, FiLayers, FiTool, FiCpu, FiBell
} from 'react-icons/fi';
import adminService from '../services/adminService';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res && res.data && typeof res.data.unreadCount === 'number') {
          setUnreadCount(res.data.unreadCount);
        }
      } catch (err) {
        console.warn('Notice fetching unread count:', err.message);
      }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // Polling every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Real-Time Analytics', path: '/', icon: <FiHome /> }
      ]
    },
    {
      title: 'ENQUIRIES & LEADS MANAGEMENT',
      items: [
        { name: 'Contact Enquiries', path: '/contact', icon: <FiInbox /> },
        { name: 'RFQ Enquiries', path: '/leads', icon: <FiFileText /> },
        { name: 'Dealer Applications', path: '/dealer-applications', icon: <FiUsers /> },
        { name: 'Newsletter Subscribers', path: '/newsletter', icon: <FiMessageSquare /> }
      ]
    },
    {
      title: 'DYNAMIC CONTENT CMS',
      items: [
        { name: 'Homepage CMS', path: '/cms/home', icon: <FiSliders /> },
        { name: 'About Page CMS', path: '/cms/about', icon: <FiLayers /> },
        { name: 'Manufacturing CMS', path: '/cms/manufacturing', icon: <FiCpu /> },
        { name: 'Footer & Contact CMS', path: '/cms/footer', icon: <FiGlobe /> },
        { name: 'Logo Manager', path: '/cms/logo', icon: <FiImage /> },
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
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enterprise Control Center</div>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                {section.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', display: 'flex' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info / Logout Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{user?.name || 'Admin User'}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.role || 'Super Admin'}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ border: 'none', padding: '0.4rem', color: 'var(--danger)' }} title="Logout">
            <FiLogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Navbar Header */}
        <header style={{ height: '64px', borderBottom: '1px solid var(--border)', background: 'var(--bg-header)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Welcome back, <strong style={{ color: 'var(--text-main)' }}>{user?.name || 'Administrator'}</strong>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Bell Notification Badge */}
            <NavLink 
              to="/contact" 
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--border)', textDecoration: 'none' }}
              title="View Enquiries"
            >
              <FiBell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--danger)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, borderRadius: '9999px', padding: '2px 6px', lineHeight: 1 }}>
                  {unreadCount}
                </span>
              )}
            </NavLink>

            <a href="https://www.ecomargin.in" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <FiGlobe /> View Live Website
            </a>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-main)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
