// EcoMargin Admin Panel — Services & EPC Management CMS
// src/pages/CMS/ServicesCMSPage.jsx
import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiTool, FiZap, FiShield, FiActivity, FiCheck } from 'react-icons/fi';

export default function ServicesCMSPage() {
  const [services, setServices] = useState([
    { id: 1, name: 'Turnkey EPC Station Installation', category: 'EPC Execution', description: 'Complete site feasibility, civil plinth work, HT transformer, DISCOM grid approval, and full commissioning.', status: 'Active' },
    { id: 2, name: 'Power Load & Electrical Survey', category: 'Engineering', description: 'Engineering assessment of electrical grid capacity, soil testing, and optimal station layout design.', status: 'Active' },
    { id: 3, name: 'Civil & Plinth Construction', category: 'Civil Work', description: 'Construction of reinforced concrete charger plinths, cable trenching, canopy structures, and protective bollards.', status: 'Active' },
    { id: 4, name: 'HT/LT Transformer & Substation Setup', category: 'Electrical Work', description: 'Installation of dedicated HT/LT transformers, compact substations, HT breakers, CT/PT metering, and earthing pits.', status: 'Active' },
    { id: 5, name: 'Testing & Commissioning', category: 'Quality QA', description: 'Full power load bank testing, insulation resistance verification, insulation safety checks, and CEIG approvals.', status: 'Active' },
    { id: 6, name: 'OCPP CSMS Software Integration', category: 'Software', description: 'Configuration of OCPP 1.6J/2.0.1 telemetry parameters, RFID card white-listing, payment gateway binding, and app integration.', status: 'Active' },
    { id: 7, name: 'Annual Maintenance Contracts (AMC)', category: 'Support & NOC', description: 'Comprehensive 24/7 NOC monitoring, preventative quarterly servicing, emergency technician dispatch, and SLA guarantees.', status: 'Active' },
    { id: 8, name: 'Fleet Charging Solutions', category: 'Commercial Fleets', description: 'Dedicated high-power DC charging hubs designed for 2-wheeler, 3-wheeler, e-bus, and commercial delivery fleets.', status: 'Active' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'EPC Execution', description: '', status: 'Active' });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({ name: '', category: 'EPC Execution', description: '', status: 'Active' });
    setShowModal(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData(srv);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...formData, id: editingService.id } : s));
    } else {
      setServices([...services, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Services & EPC CMS Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Turnkey EPC Installation, Transformer Setup, Civil Work, OCPP CSMS & AMC Services</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Add New Service Module
        </button>
      </div>

      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Service Title</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>Scope Description</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(srv => (
              <tr key={srv.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{srv.name}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {srv.category}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '350px' }}>{srv.description}</td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${srv.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {srv.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(srv)} className="btn btn-outline" style={{ padding: '0.4rem' }} title="Edit">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(srv.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
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
          <div className="card" style={{ width: '100%', maxWidth: '550px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
              {editingService ? 'Edit Service Details' : 'Add New Service Module'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Service Title *</label>
                <input type="text" required className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. HT/LT Substation & Transformer Setup" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category</label>
                  <select className="input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="EPC Execution">EPC Execution</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Civil Work">Civil Work</option>
                    <option value="Electrical Work">Electrical Work</option>
                    <option value="Quality QA">Quality QA</option>
                    <option value="Software">Software CSMS</option>
                    <option value="Support & NOC">Support & NOC</option>
                    <option value="Commercial Fleets">Commercial Fleets</option>
                  </select>
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Service Description / Scope</label>
                <textarea rows="3" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
