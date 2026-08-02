// EcoMargin Admin Panel — Enterprise Cloudinary Media Manager
// src/pages/Media/MediaPage.jsx
import React, { useState } from 'react';
import { FiUploadCloud, FiTrash2, FiCopy, FiCheck, FiFolder, FiFile, FiVideo, FiImage, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MediaPage() {
  const [activeFolder, setActiveFolder] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const [files, setFiles] = useState([
    { id: 1, name: 'hero-ev-charging-station.mp4', size: '14.2 MB', type: 'video', category: 'Videos', url: 'https://res.cloudinary.com/ecomargin/video/upload/v1/hero-ev.mp4' },
    { id: 2, name: '120kw-dc-fast-charger-factory.jpg', size: '2.4 MB', type: 'image', category: 'Images', url: 'https://res.cloudinary.com/ecomargin/image/upload/v1/120kw-dc.jpg' },
    { id: 3, name: '60kw-dual-gun-dc-station.png', size: '1.8 MB', type: 'image', category: 'Images', url: 'https://res.cloudinary.com/ecomargin/image/upload/v1/60kw-dc.png' },
    { id: 4, name: 'arai-compliance-certificate.pdf', size: '2.1 MB', type: 'pdf', category: 'PDFs', url: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/arai-ais138.pdf' },
    { id: 5, name: 'iso-9001-factory-certificate.pdf', size: '1.4 MB', type: 'pdf', category: 'PDFs', url: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/iso9001.pdf' },
    { id: 6, name: 'smt-pcb-assembly-line.jpg', size: '3.1 MB', type: 'image', category: 'Images', url: 'https://res.cloudinary.com/ecomargin/image/upload/v1/smt-line.jpg' }
  ]);

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleUploadSimulate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVid = file.type.includes('video');
    const isPdf = file.type.includes('pdf');
    const category = isVid ? 'Videos' : isPdf ? 'PDFs' : 'Images';
    
    const newMedia = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: isVid ? 'video' : isPdf ? 'pdf' : 'image',
      category: category,
      url: `https://res.cloudinary.com/ecomargin/upload/${file.name}`
    };

    setFiles([newMedia, ...files]);
  };

  const filteredFiles = files.filter(f => {
    const matchesFolder = activeFolder === 'All' || f.category === activeFolder;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Cloudinary Media Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Upload & Organize Images, High-Definition Videos, and PDF Spec Sheets</p>
        </div>

        <label className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <FiUploadCloud /> Upload to Cloudinary
          <input type="file" onChange={handleUploadSimulate} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Images', 'Videos', 'PDFs'].map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`btn ${activeFolder === folder ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              {folder}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Media Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {filteredFiles.map((file) => (
          <motion.div 
            key={file.id} 
            whileHover={{ y: -4 }}
            className="card"
            style={{ padding: '0', overflow: 'hidden' }}
          >
            <div style={{ height: '160px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {file.type === 'image' && <FiImage style={{ fontSize: '3rem', color: 'var(--primary)' }} />}
              {file.type === 'video' && <FiVideo style={{ fontSize: '3rem', color: '#3B82F6' }} />}
              {file.type === 'pdf' && <FiFile style={{ fontSize: '3rem', color: '#F59E0B' }} />}
              <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {file.type.toUpperCase()}
              </span>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={file.name}>
                {file.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{file.size}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleCopyUrl(file.id, file.url)} 
                  className="btn btn-outline" 
                  style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                >
                  {copiedId === file.id ? <><FiCheck style={{ color: 'var(--primary)' }} /> Copied!</> : <><FiCopy /> Copy URL</>}
                </button>
                <button 
                  onClick={() => handleDelete(file.id)} 
                  className="btn btn-outline" 
                  style={{ padding: '0.4rem', color: 'var(--danger)' }} 
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
