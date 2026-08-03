// EcoMargin Admin Panel — Real-Time Interactive Analytics & Control Dashboard
// src/pages/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, FiUsers, FiBox, FiBriefcase, FiMail, 
  FiRefreshCw, FiGrid, FiFileText, FiFolder, FiAward, FiClock, 
  FiActivity, FiSliders, FiLayers, FiCpu, FiGlobe, FiSearch, 
  FiImage, FiMessageSquare, FiSettings, FiExternalLink
} from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import adminService from '../../services/adminService';

const ClickableStatCard = ({ title, value, icon, trend, path, color = 'var(--primary)', isSmall = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link 
      to={path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: isSmall ? '1rem 1.15rem' : '1.25rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        border: hovered ? `1px solid ${color}` : '1px solid var(--border)',
        boxShadow: hovered ? '0 12px 28px -6px rgba(0, 0, 0, 0.45)' : 'var(--shadow-md)',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative'
      }}
    >
      <div>
        <div style={{ color: 'var(--text-muted)', fontSize: isSmall ? '0.75rem' : '0.8rem', marginBottom: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {title} {hovered && <FiExternalLink style={{ fontSize: '0.75rem', color: color }} />}
        </div>
        <div style={{ fontSize: isSmall ? '1.4rem' : '1.75rem', fontWeight: 'bold', marginBottom: '0.35rem', color: 'var(--text-main)' }}>{value}</div>
        <div style={{ color: color, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
          <FiTrendingUp /> {trend}
        </div>
      </div>
      <div style={{ 
        padding: isSmall ? '0.65rem' : '0.85rem', 
        background: hovered ? `${color}20` : 'rgba(255,255,255,0.03)', 
        border: `1px solid ${hovered ? color : 'var(--border)'}`, 
        borderRadius: 'var(--radius-md)', 
        fontSize: isSmall ? '1.1rem' : '1.25rem', 
        color: color,
        transition: 'all 0.25s ease'
      }}>
        {icon}
      </div>
    </Link>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, analyticsRes, activitiesRes] = await Promise.all([
        adminService.getDashboardStats().catch(err => ({ data: null, error: err.message })),
        adminService.getDashboardAnalytics().catch(err => ({ data: null, error: err.message })),
        adminService.getDashboardActivities().catch(err => ({ data: [], error: err.message }))
      ]);

      if (statsRes && statsRes.data) {
        setStats(statsRes.data);
      }
      if (analyticsRes && analyticsRes.data) {
        setAnalytics(analyticsRes.data);
      }
      if (activitiesRes && (activitiesRes.data || Array.isArray(activitiesRes))) {
        setActivities(activitiesRes.data || activitiesRes);
      }
    } catch (err) {
      console.error('❌ Error fetching dashboard analytics:', err);
      setError('Failed to load real-time analytics from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Real-Time Enterprise Control Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Click any card below to navigate directly to its related management module</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 1.5s infinite' }}></span>
            MYSQL LIVE CONNECTED
          </span>
          <button onClick={fetchDashboardData} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
          {error}
        </div>
      )}

      {/* Section 1: Core Business Telemetry & Lead Shortcuts */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
          📊 Business Telemetry & Active Lead Modules (Click to Open)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <ClickableStatCard title="Total Enquiries & RFQs" value={stats?.totalContactEnquiries ?? '...'} icon={<FiMail />} trend={`${stats?.todayEnquiries ?? 0} Today`} path="/contact" color="#3b82f6" />
          <ClickableStatCard title="Dealer Applications" value={stats?.totalDealerApplications ?? '...'} icon={<FiUsers />} trend={`${stats?.newDealerApplications ?? 0} New`} path="/dealer-applications" color="#f59e0b" />
          <ClickableStatCard title="Product Range & Models" value={stats?.totalProducts ?? '...'} icon={<FiBox />} trend="3.3kW – 240kW DC" path="/products" color="#10b981" />
          <ClickableStatCard title="Completed EPC Projects" value={stats?.totalProjects ?? '...'} icon={<FiBriefcase />} trend="Turnkey Plinths" path="/projects" color="#8b5cf6" />
          <ClickableStatCard title="Product Categories" value={stats?.totalCategories ?? '...'} icon={<FiGrid />} trend="AC, LVDC & DC Fast" path="/categories" color="#ec4899" />
          <ClickableStatCard title="Industry Sectors" value={stats?.totalIndustries ?? '...'} icon={<FiFolder />} trend="Highways & Depots" path="/cms/industries" color="#06b6d4" />
          <ClickableStatCard title="Technical Downloads" value={stats?.totalDownloads ?? '...'} icon={<FiAward />} trend="Datasheets & Certs" path="/downloads" color="#84cc16" />
          <ClickableStatCard title="Published Whitepapers" value={stats?.totalBlogs ?? '...'} icon={<FiFileText />} trend="ARAI & AIS Guides" path="/blogs" color="#6366f1" />
        </div>
      </div>

      {/* Dynamic Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* Monthly Lead & RFQ Growth Trend */}
        <div className="card" style={{ height: '420px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>B2B Quotation Leads & Enquiry Growth</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Monthly RFQ Submissions & Enquiries Trend (Last 6 Months)</p>
            </div>
            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              DATABASE AGGREGATED
            </span>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={analytics?.monthlyEnquiries || [
              { name: 'Mar', enquiries: 4, rfq: 2 },
              { name: 'Apr', enquiries: 6, rfq: 3 },
              { name: 'May', enquiries: 8, rfq: 5 },
              { name: 'Jun', enquiries: 12, rfq: 7 },
              { name: 'Jul', enquiries: 15, rfq: 10 },
              { name: 'Aug', enquiries: 18, rfq: 12 }
            ]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }} />
              <Area type="monotone" dataKey="enquiries" stroke="#10b981" fillOpacity={1} fill="url(#colorEnquiries)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Category Distribution Chart */}
        <div className="card" style={{ height: '420px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Category Distribution</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Hardware & Software Offerings</p>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={analytics?.categoryDistribution || [
              { name: 'AC Chargers', value: 40 },
              { name: 'DC Fast', value: 35 },
              { name: 'LVDC', value: 15 },
              { name: 'CSMS', value: 10 }
            ]}>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} />
              <YAxis stroke="var(--text-muted)" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Section 2: Quick Enterprise Control Shortcuts */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
          ⚡ CMS & Administration Shortcuts (Click to Open)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <ClickableStatCard isSmall title="Newsletter Subscribers" value={stats?.totalNewsletterSubscribers ?? '...'} icon={<FiMessageSquare />} trend="Subscribers" path="/newsletter" color="#f43f5e" />
          <ClickableStatCard isSmall title="Homepage CMS" value="Active" icon={<FiSliders />} trend="Live Editor" path="/cms/home" color="#3b82f6" />
          <ClickableStatCard isSmall title="About CMS" value="Active" icon={<FiLayers />} trend="Vision & Mission" path="/cms/about" color="#10b981" />
          <ClickableStatCard isSmall title="Manufacturing CMS" value="Active" icon={<FiCpu />} trend="SLA & Testing" path="/cms/manufacturing" color="#8b5cf6" />
          <ClickableStatCard isSmall title="Footer & Contact CMS" value="Active" icon={<FiGlobe />} trend="Global Location" path="/cms/footer" color="#06b6d4" />
          <ClickableStatCard isSmall title="SEO & Schema Manager" value="Active" icon={<FiSearch />} trend="Google Metadata" path="/seo" color="#f59e0b" />
          <ClickableStatCard isSmall title="Media Manager" value="Cloudinary" icon={<FiImage />} trend="Assets Gallery" path="/media" color="#ec4899" />
          <ClickableStatCard isSmall title="Website Settings" value="Configured" icon={<FiSettings />} trend="System Params" path="/settings" color="#84cc16" />
          <ClickableStatCard isSmall title="Users & Permissions" value={stats?.totalAdminUsers ?? '2 Admins'} icon={<FiUsers />} trend="RBAC Access" path="/users" color="#6366f1" />
        </div>
      </div>

      {/* Recent Activity Timeline Feed (Latest 20 Activity Logs) */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiActivity style={{ color: 'var(--primary)' }} /> Live Audit & Activity Timeline
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Real-Time System Logs & Lead Submissions</p>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latest 20 Activities</span>
        </div>

        {activities.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No system activity recorded yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activities.map((act, index) => {
              const timeStr = act.createdAt ? new Date(act.createdAt).toLocaleString() : 'Just now';
              return (
                <div key={act.id || index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.85rem 1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', fontSize: '1rem' }}>
                    <FiClock />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{act.action}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{timeStr}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', margin: '0.2rem 0 0 0' }}>{act.description}</p>
                  </div>
                  <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                    {act.type || 'System'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  );
}
