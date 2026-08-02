import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiBox, FiList, FiFileText, FiImage, 
  FiBriefcase, FiUsers, FiMail, FiMessageSquare, 
  FiSettings, FiSearch, FiFolder, FiLogOut
} from 'react-icons/fi';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Products', path: '/products', icon: <FiBox /> },
    { name: 'Categories', path: '/categories', icon: <FiList /> },
    { name: 'Blogs', path: '/blogs', icon: <FiFileText /> },
    { name: 'Gallery', path: '/gallery', icon: <FiImage /> },
    { name: 'Projects', path: '/projects', icon: <FiBriefcase /> },
    { name: 'Users', path: '/users', icon: <FiUsers /> },
    { name: 'Contact Submissions', path: '/contact', icon: <FiMail /> },
    { name: 'Newsletter', path: '/newsletter', icon: <FiMessageSquare /> },
    { name: 'Media Manager', path: '/media', icon: <FiFolder /> },
    { name: 'Website Settings', path: '/settings', icon: <FiSettings /> },
    { name: 'SEO Configurations', path: '/seo', icon: <FiSearch /> },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: 0 }}>EcoMargin</h2>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Panel v1.0</div>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                nav-link ${isActive ? 'active' : ''}
              `}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                borderRadius: 'var(--radius-md)', color: isActive ? '#fff' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.875rem', fontWeight: 500
              })}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dashboard</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
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
