// EcoMargin Admin Panel — Manufacturing Page CMS Management
// src/pages/CMS/ManufacturingCMSPage.jsx
import React, { useState, useEffect } from 'react';
import { FiSave, FiCheck, FiCpu, FiAlertCircle } from 'react-icons/fi';
import { adminService } from '../../services/adminService';

export default function ManufacturingCMSPage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mfg, setMfg] = useState({
    heroTitle: "Designed & Built for Indian Operating Conditions",
    heroSubtitle: "OEM & White Label Manufacturing",
    description: "Grid fluctuations, extreme ambient temperatures (up to 55°C), and dust exposure require specialized hardware engineering. EcoMargin's chargers feature built-in isolation transformers, wide input voltage tolerance (200V–480V AC), and IP55 weatherproof enclosures.",
    factoryArea: "50,000 sq.ft.",
    annualCapacity: "50,000+ Units",
    burnInTestingHours: "48 Hours",
    defectRate: "0.01%"
  });

  useEffect(() => {
    const fetchManufacturing = async () => {
      try {
        const res = await adminService.getManufacturingCMS();
        const payload = res?.data || (res?.factoryArea ? res : null);
        if (payload) {
          setMfg(prev => ({ ...prev, ...payload }));
        }
      } catch (err) {
        console.warn('Initial Manufacturing CMS load notice:', err.message);
      }
    };
    fetchManufacturing();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminService.updateManufacturingCMS(mfg);
      if (res && (res.success === true || res.data)) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        throw new Error(res?.message || 'Failed to save Manufacturing CMS');
      }
    } catch (err) {
      console.error('❌ Error saving Manufacturing CMS:', err);
      setError(err.message || err.data?.message || 'Error saving changes to database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCpu style={{ color: 'var(--primary)' }} /> Manufacturing Page CMS Manager
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Manage OEM Factory Headlines, Plant Overview, Factory Area, Capacity, Testing & Metrics
          </p>
        </div>
        <button onClick={handleSave} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {loading ? 'Saving to Database...' : saved ? <><FiCheck /> Saved Successfully</> : <><FiSave /> Save Changes</>}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Plant Overview Banners */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Factory Hero & Plant Overview</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Tagline / Category Subtitle</label>
              <input type="text" className="input" value={mfg.heroSubtitle} onChange={(e) => setMfg({ ...mfg, heroSubtitle: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Main Headline Title</label>
              <input type="text" className="input" value={mfg.heroTitle} onChange={(e) => setMfg({ ...mfg, heroTitle: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Plant Capability Description</label>
              <textarea rows="4" className="input" value={mfg.description} onChange={(e) => setMfg({ ...mfg, description: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Factory Plant Specs & Metrics */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Factory Floor Specs & Quality Metrics</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Factory Floor Area</label>
              <input type="text" className="input" value={mfg.factoryArea} onChange={(e) => setMfg({ ...mfg, factoryArea: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Annual Production Capacity</label>
              <input type="text" className="input" value={mfg.annualCapacity} onChange={(e) => setMfg({ ...mfg, annualCapacity: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Burn-in Testing</label>
              <input type="text" className="input" value={mfg.burnInTestingHours} onChange={(e) => setMfg({ ...mfg, burnInTestingHours: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>RMA Defect Rate</label>
              <input type="text" className="input" value={mfg.defectRate} onChange={(e) => setMfg({ ...mfg, defectRate: e.target.value })} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
