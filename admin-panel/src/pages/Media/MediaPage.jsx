import React from 'react';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MediaPage() {
  const files = [
    { id: 1, name: 'hero-banner.jpg', size: '1.2 MB', type: 'image/jpeg' },
    { id: 2, name: 'csms-mockup.png', size: '2.5 MB', type: 'image/png' },
    { id: 3, name: 'logo-white.svg', size: '45 KB', type: 'image/svg+xml' },
  ];

  return (
    <div className="card" style={{ padding: '0' }}>
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Media Manager</h2>
        <button className="btn btn-primary">
          <FiUploadCloud /> Upload Files
        </button>
      </div>
      
      <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {files.map((file) => (
          <motion.div 
            key={file.id} 
            whileHover={{ y: -5 }}
            style={{ 
              background: 'var(--bg-main)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden' 
            }}
          >
            <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-hover)' }}>
              <span style={{ color: 'var(--text-muted)' }}>[Preview]</span>
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{file.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{file.size}</span>
                <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><FiTrash2 /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
