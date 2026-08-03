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
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>EcoMargin Enterprise Control Center</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            
            {/* Notification Badge */}
            <div 
              onClick={() => navigate('/contact')} 
              style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border)' }}
              title={`${unreadCount} New Enquiries`}
            >
              <FiBell style={{ fontSize: '1.2rem', color: unreadCount > 0 ? 'var(--primary)' : 'var(--text-muted)' }} />
              {unreadCount > 0 && (
                <span style={{ 
                  position: 'absolute', top: '-4px', right: '-4px', 
                  background: 'var(--danger)', color: '#fff', 
                  fontSize: '0.65rem', fontWeight: 800, 
                  width: '18px', height: '18px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>

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
