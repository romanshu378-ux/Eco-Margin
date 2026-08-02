import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiBox, FiDollarSign } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { adminService } from '../../services/adminService';

const chartData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

const StatCard = ({ title, value, icon, trend }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    <div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{value}</div>
      <div style={{ color: 'var(--primary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <FiTrendingUp /> {trend}
      </div>
    </div>
    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', fontSize: '1.25rem', color: 'var(--primary)' }}>
      {icon}
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: '$45,231',
    activeDrivers: '+2350',
    activeChargers: '1,204',
    energyDelivered: '45 MWh'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success && res.data) {
          setStats({
            totalRevenue: `$${res.data.totalRevenue?.toLocaleString() || '45,231'}`,
            activeDrivers: `+${res.data.activeDrivers || '2350'}`,
            activeChargers: res.data.activeChargers?.toLocaleString() || '1,204',
            energyDelivered: res.data.energyDelivered || '45 MWh'
          });
        }
      } catch (err) {
        console.warn('Backend API connection fallback used for stats:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {loading && (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fetching live metrics...</div>
      )}

      {error && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
          Notice: Operating in offline mode ({error}). Mock metrics loaded.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Revenue" value={stats.totalRevenue} icon={<FiDollarSign />} trend="+20.1% from last month" />
        <StatCard title="Active Drivers" value={stats.activeDrivers} icon={<FiUsers />} trend="+180 from last month" />
        <StatCard title="Active Chargers" value={stats.activeChargers} icon={<FiBox />} trend="+19 from last month" />
        <StatCard title="Energy Delivered" value={stats.energyDelivered} icon={<FiTrendingUp />} trend="+12% from last month" />
      </div>

      <div className="card" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Revenue Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
