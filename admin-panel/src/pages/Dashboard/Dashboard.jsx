// EcoMargin Admin Panel — Enterprise CMS Dashboard
// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiBox, FiBriefcase, FiMail, FiEye, FiCheckCircle } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsChartData = [
  { name: 'Jan', leads: 45, visitors: 3200 },
  { name: 'Feb', leads: 62, visitors: 4100 },
  { name: 'Mar', leads: 78, visitors: 5400 },
  { name: 'Apr', leads: 95, visitors: 6200 },
  { name: 'May', leads: 110, visitors: 7100 },
  { name: 'Jun', leads: 140, visitors: 8900 },
  { name: 'Jul', leads: 185, visitors: 10400 },
  { name: 'Aug', leads: 135, visitors: 9800 }
];

const StatCard = ({ title, value, icon, trend, subtext }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    <div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text)' }}>{value}</div>
      <div style={{ color: 'var(--primary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <FiTrendingUp /> {trend}
      </div>
    </div>
    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', fontSize: '1.25rem', color: 'var(--primary)' }}>
      {icon}
    </div>
  </div>
);

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalVisitors: '45,280',
    totalProducts: '14 Models',
    totalProjects: '128 Installed',
    totalEnquiries: '850 RFQs',
    todayLeads: '+12 Today'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Enterprise CMS Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Live B2B Lead Conversion & Infrastructure Network Telemetry</p>
      </div>

      {/* 5 Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Website Visitors" value={metrics.totalVisitors} icon={<FiEye />} trend="+24% this month" />
        <StatCard title="Product Range" value={metrics.totalProducts} icon={<FiBox />} trend="3.3kW to 240kW DC" />
        <StatCard title="Completed EPC Projects" value={metrics.totalProjects} icon={<FiBriefcase />} trend="Highways & Bus Depots" />
        <StatCard title="Total RFQ Enquiries" value={metrics.totalEnquiries} icon={<FiMail />} trend="+135 this month" />
        <StatCard title="Today's Active Leads" value={metrics.todayLeads} icon={<FiUsers />} trend="+4 Dealer inquiries" />
      </div>

      {/* Lead Analytics Chart */}
      <div className="card" style={{ height: '420px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>B2B Quotation Leads & Visitor Growth</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Monthly RFQ Submissions vs Overall Website Traffic</p>
          </div>
          <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
            LIVE ANALYTICS
          </span>
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={analyticsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            <Area type="monotone" dataKey="leads" stroke="var(--primary)" fillOpacity={1} fill="url(#colorLeads)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
