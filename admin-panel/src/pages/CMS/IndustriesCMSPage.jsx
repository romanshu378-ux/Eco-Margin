// EcoMargin Admin Panel — Industries & Sectors CMS
// src/pages/CMS/IndustriesCMSPage.jsx
import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiBriefcase } from 'react-icons/fi';

export default function IndustriesCMSPage() {
  const [industries, setIndustries] = useState([
    { id: 1, name: 'Express Highways & Fuel Pumps', icon: '🛣️', desc: 'Ultra-fast DC charging hubs for long-distance EV travel.', status: 'Active' },
    { id: 2, name: 'Commercial Fleets & Logistics', icon: '🚚', desc: 'Dedicated fast charging infrastructure for 2-wheeler, 3-wheeler, and 4-wheeler delivery fleets.', status: 'Active' },
    { id: 3, name: 'E-Bus & Transport Depots', icon: '🚌', desc: 'Heavy duty 240kW pantograph & dual CCS2 DC chargers for public bus fleets.', status: 'Active' },
    { id: 4, name: 'Hotels & Hospitality', icon: '🏨', desc: 'Destination AC charging wallboxes for luxury guest amenities.', status: 'Active' },
    { id: 5, name: 'Residential Apartments & Gated Societies', icon: '🏢', desc: 'Shared AC chargers with individual RFID & mobile billing.', status: 'Active' },
    { id: 6, name: 'Government & Public Infrastructure', icon: '🏛️', desc: 'Turnkey EPC charging hubs for municipal corporations and smart cities.', status: 'Active' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingInd, setEditingInd] = useState(null);
  const [formData, setFormData] = useState({ name: '', icon: '⚡', desc: '', status: 'Active' });

  const handleOpenAdd = () => {
    setEditingInd(null);
    setFormData({ name: '', icon: '⚡', desc: '', status: 'Active' });
    setShowModal(true);
  };

  const handleOpenEdit = (ind) => {
    setEditingInd(ind);
    setFormData(ind);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setIndustries(industries.filter(i => i.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingInd) {
      setIndustries(industries.map(i => i.id === editingInd.id ? { ...formData, id: editingInd.id } : i));
    } else {
      setIndustries([...industries, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Industries & Sectors CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Industry Verticals (Highways, Fleets, Bus Depots, Hotels, Apartments, Petrol Pumps)</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Add Industry Sector
        </button>
      </div>

      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Industry Sector</th>
              <th style={{ padding: '0.75rem 1rem' }}>Icon</th>
              <th style={{ padding: '0.75rem 1rem' }}>Target Description</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {industries.map(ind => (
              <tr key={ind.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{ind.name}</td>
                <td style={{ padding: '1rem', fontSize: '1.25rem' }}>{ind.icon}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '350px' }}>{ind.desc}</td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${ind.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {ind.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(ind)} className="btn btn-outline" style={{ padding: '0.4rem' }} title="Edit">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(ind.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
              {editingInd ? 'Edit Industry Sector' : 'Add New Industry Sector'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Sector Name *</label>
                <input type="text" required className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Express Highways & Petrol Pumps" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Icon / Emoji</label>
                  <input type="text" className="input" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="🛣️" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Description</label>
                <textarea rows="3" className="input" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Sector</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
