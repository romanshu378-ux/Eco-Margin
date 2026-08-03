// EcoMargin Admin Panel — Downloads & Certificates CMS Management
// src/pages/CMS/DownloadsCMSPage.jsx

import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiFileText, FiCheck, FiRefreshCw, FiAlertCircle, FiImage } from 'react-icons/fi';
import downloadsService from '../../services/downloadsService';
import DownloadForm from '../../components/CMS/DownloadForm';

export default function DownloadsCMSPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchDownloads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await downloadsService.getDownloads();
      if (res && res.data) {
        setDownloads(res.data);
      } else if (Array.isArray(res)) {
        setDownloads(res);
      } else {
        setDownloads([]);
      }
    } catch (err) {
      console.error('❌ Error fetching downloads:', err);
      setError(err.message || err.data?.message || 'Failed to fetch downloads from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id, docName) => {
    if (!window.confirm(`Are you sure you want to delete "${docName || 'this document'}" permanently?`)) return;

    try {
      await downloadsService.deleteDownload(id);
      showToast('Document deleted successfully!');
      fetchDownloads();
    } catch (err) {
      console.error('❌ Error deleting download:', err);
      setError(err.message || 'Failed to delete document.');
    }
  };

  const handleFormSuccess = (msg) => {
    setShowModal(false);
    setEditingItem(null);
    showToast(msg);
    fetchDownloads();
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Top Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Downloads & Certificates CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Technical Datasheets, CAD Drawings, ARAI, ISO & CE Certificates</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchDownloads} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Refresh List">
            <FiRefreshCw className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add New Spec / Certificate
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiCheck /> {toastMessage}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <FiAlertCircle /> {error}
        </div>
      )}

      {/* Downloads Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading document specifications from database...
          </div>
        ) : downloads.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No download documents found in database. Click "Add New Spec / Certificate" to create one.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Icon</th>
                <th style={{ padding: '0.75rem 1rem' }}>Document Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>File Size</th>
                <th style={{ padding: '0.75rem 1rem' }}>Order</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>PDF Link</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((item) => {
                const docName = item.name || item.title;
                const pdfUrl = item.fileUrl || item.file_url || item.pdfUrl;
                const iconUrl = item.iconUrl || item.icon_url;

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}>
                      {iconUrl ? (
                        <img src={iconUrl} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px', background: '#fff', padding: '2px', border: '1px solid var(--border)' }} />
                      ) : (
                        <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiFileText />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>
                      <div>{docName}</div>
                      {item.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{item.description}</div>}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.fileSize || item.file_size || 'N/A'}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.displayOrder ?? item.display_order ?? 0}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: item.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: item.status === 'Active' ? 'var(--primary)' : 'var(--danger)' }}>
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pdfUrl ? (
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>View PDF</a>
                      ) : (
                        <span style={{ color: 'var(--danger)' }}>No PDF</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenEdit(item)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary)' }} title="Edit Document">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(item.id, docName)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete Document">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {showModal && (
        <DownloadForm
          initialData={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

    </div>
  );
}
