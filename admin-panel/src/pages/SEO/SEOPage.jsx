// EcoMargin Admin Panel — SEO & Schema Manager
// src/pages/SEO/SEOPage.jsx
import React, { useState } from 'react';
import { FiSave, FiCheck, FiSearch, FiCode, FiShare2, FiFileText } from 'react-icons/fi';

export default function SEOPage() {
  const [saved, setSaved] = useState(false);
  const [seo, setSeo] = useState({
    metaTitle: "EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company",
    metaDescription: "EcoMargin manufactures 3.3kW to 240kW commercial AC & DC chargers, OCPP CSMS software, and turnkey EPC charging station installation.",
    keywords: "EV Charger Manufacturer India, DC Fast Charger 60kW 120kW 240kW, ARAI Certified EV Charger, OCPP 2.0.1 Software",
    canonicalUrl: "https://ecomargin.vercel.app",
    ogTitle: "EcoMargin EV Charging Infrastructure & OEM Factory",
    ogDescription: "Powering India's EV Infrastructure with 3.3kW to 240kW AC & DC Chargers.",
    ogImage: "https://ecomargin.vercel.app/og-image.jpg",
    twitterCard: "summary_large_image",
    robotsTxt: "User-agent: *\nAllow: /\nSitemap: https://ecomargin.vercel.app/sitemap.xml",
    sitemapUrl: "https://ecomargin.vercel.app/sitemap.xml",
    organizationSchema: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EcoMargin Infrastructure Pvt. Ltd.",
  "url": "https://ecomargin.vercel.app",
  "logo": "https://ecomargin.vercel.app/logo.png"
}`
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>SEO & Meta Schema Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Search Engine Metadata, Open Graph, Twitter Cards, JSON-LD Schemas, Robots & Sitemap</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save SEO Changes</>}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Search Engine Metadata */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiSearch /> Global Search Metadata
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Global Meta Title</label>
              <input type="text" className="input" value={seo.metaTitle} onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Meta Description (150 - 160 characters)</label>
              <textarea rows="3" className="input" value={seo.metaDescription} onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Target Keywords (Comma Separated)</label>
              <textarea rows="2" className="input" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Canonical URL</label>
              <input type="url" className="input" value={seo.canonicalUrl} onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Social Sharing & Robots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiShare2 /> Open Graph & Twitter Cards
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>OG / Social Share Title</label>
                <input type="text" className="input" value={seo.ogTitle} onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>OG Share Image URL</label>
                <input type="url" className="input" value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCode /> JSON-LD Structured Data Schema
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Organization & LocalBusiness Schema (JSON)</label>
              <textarea rows="5" className="input" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} value={seo.organizationSchema} onChange={(e) => setSeo({ ...seo, organizationSchema: e.target.value })} />
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
