// EcoMargin Admin Panel — Downloads & Certificates CMS Management
// src/pages/CMS/DownloadsCMSPage.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiDownload, FiFileText, FiCheck } from 'react-icons/fi';

export default function DownloadsCMSPage() {
  const [downloads, setDownloads] = useState([
    { id: 1, name: 'EcoWall 7.4kW AC Single Phase Charger Specification Sheet', category: 'Technical Datasheet', size: '1.2 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/7.4kW-AC.pdf' },
    { id: 2, name: 'EcoWall 22kW Dual Gun AC Charger Spec & CAD Drawing', category: 'Technical Datasheet', size: '1.8 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/22kW-AC.pdf' },
    { id: 3, name: 'EcoCharge 30kW DC Fast Charger Technical Manual', category: 'Technical Datasheet', size: '2.5 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/30kW-DC.pdf' },
    { id: 4, name: 'EcoCharge 60kW Dual CCS2 DC Charger Brochure', category: 'Technical Datasheet', size: '3.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/60kW-DC.pdf' },
    { id: 5, name: 'ARAI Test Compliance Certificate (AIS 138 Part 1 & 2)', category: 'Certificates', size: '2.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/arai-ais138.pdf' },
    { id: 6, name: 'ISO 9001:2015 Quality Management System Certificate', category: 'Certificates', size: '1.4 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/iso9001.pdf' },
    { id: 7, name: 'CE Mark Electrical Safety Test Declaration', category: 'Certificates', size: '1.1 MB', fileUrl: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/certs/ce-mark.pdf' }
  ]);

  const [newFile, setNewFile] = useState({ name: '', category: 'Technical Datasheet', size: '1.5 MB', fileUrl: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newFile.name || !newFile.fileUrl) return;
    setDownloads([...downloads, { ...newFile, id: Date.now() }]);
    setNewFile({ name: '', category: 'Technical Datasheet', size: '1.5 MB', fileUrl: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setDownloads(downloads.filter(d => d.id !== id));
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Downloads & Certificates CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Technical Datasheets, CAD Drawings, ARAI, ISO & CE Certificates</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Add New Spec / Certificate
        </button>
      </div>

      {/* Downloads List Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Document Name</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>File Size</th>
              <th style={{ padding: '0.75rem 1rem' }}>URL</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiFileText style={{ color: 'var(--primary)' }} /> {item.name}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.size}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>View PDF</a>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Add Datasheet / Certificate</h3>
            
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Document Name *</label>
                <input type="text" required className="input" value={newFile.name} onChange={(e) => setNewFile({ ...newFile, name: e.target.value })} placeholder="e.g. 120kW DC Charger Specification Sheet" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category</label>
                  <select className="input" value={newFile.category} onChange={(e) => setNewFile({ ...newFile, category: e.target.value })}>
                    <option value="Technical Datasheet">Technical Datasheet</option>
                    <option value="Certificates">Certificates (ARAI / CE / ISO)</option>
                    <option value="Installation Guides">Installation Guides</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>File Size</label>
                  <input type="text" className="input" value={newFile.size} onChange={(e) => setNewFile({ ...newFile, size: e.target.value })} placeholder="e.g. 2.4 MB" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>PDF File URL (Cloudinary / Direct Link) *</label>
                <input type="url" required className="input" value={newFile.fileUrl} onChange={(e) => setNewFile({ ...newFile, fileUrl: e.target.value })} placeholder="https://res.cloudinary.com/..." />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Document</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
