// EcoMargin Admin Panel — About Page CMS Management
// src/pages/CMS/AboutCMSPage.jsx
import React, { useState } from 'react';
import { FiSave, FiCheck, FiUsers, FiClock, FiAward } from 'react-icons/fi';

export default function AboutCMSPage() {
  const [saved, setSaved] = useState(false);
  const [about, setAbout] = useState({
    vision: "To accelerate global e-mobility adoption by manufacturing reliable, high-uptime EV charging hardware.",
    mission: "Engineering 100% indigenous Indian-manufactured commercial chargers tailored for harsh grid conditions.",
    story: "Founded in 2020, EcoMargin has grown into a leading OEM charger manufacturer and EPC contractor with 50,000 sq.ft. facility.",
    directorMessage: "India's EV revolution requires ultra-fast, robust charging stations backed by 24/7 NOC monitoring.",
    factoryArea: "50,000 sq.ft.",
    annualCapacity: "50,000+ Units",
    burnInTestingHours: "48 Hours",
    defectRate: "0.01%"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>About Company CMS Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Vision, Mission, Story, Director's Message & Factory Plant Metrics</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Changes</>}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Core Pillars */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Corporate Vision, Mission & Company Story</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Vision</label>
              <textarea rows="2" className="input" value={about.vision} onChange={(e) => setAbout({ ...about, vision: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company Mission</label>
              <textarea rows="2" className="input" value={about.mission} onChange={(e) => setAbout({ ...about, mission: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Company History & Growth Story</label>
              <textarea rows="4" className="input" value={about.story} onChange={(e) => setAbout({ ...about, story: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Director / MD's Message</label>
              <textarea rows="3" className="input" value={about.directorMessage} onChange={(e) => setAbout({ ...about, directorMessage: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Factory Plant Specs */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Factory Plant Metrics</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Factory Floor Area</label>
              <input type="text" className="input" value={about.factoryArea} onChange={(e) => setAbout({ ...about, factoryArea: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Annual Production Capacity</label>
              <input type="text" className="input" value={about.annualCapacity} onChange={(e) => setAbout({ ...about, annualCapacity: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Full Burn-in Testing</label>
              <input type="text" className="input" value={about.burnInTestingHours} onChange={(e) => setAbout({ ...about, burnInTestingHours: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>RMA Defect Rate</label>
              <input type="text" className="input" value={about.defectRate} onChange={(e) => setAbout({ ...about, defectRate: e.target.value })} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
