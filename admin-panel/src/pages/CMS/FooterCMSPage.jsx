// EcoMargin Admin Panel — Footer & Contact CMS Management
// src/pages/CMS/FooterCMSPage.jsx
import React, { useState } from 'react';
import { FiSave, FiCheck, FiPhone, FiMail, FiMapPin, FiGlobe } from 'react-icons/fi';

export default function FooterCMSPage() {
  const [saved, setSaved] = useState(false);
  const [footer, setFooter] = useState({
    companyName: "EcoMargin Infrastructure Pvt. Ltd.",
    address: "Plot 42, Industrial Area, Sector 62, Noida, UP - 201301, India",
    phone: "+91-99999-99999",
    altPhone: "+91-88888-88888",
    email: "sales@ecomargin.com",
    supportEmail: "support@ecomargin.com",
    whatsapp: "+919999999999",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Noida%20Sector%2062&t=&z=13&ie=UTF8&iwloc=&output=embed",
    businessHours: "Monday – Saturday: 09:00 AM – 07:00 PM IST",
    linkedin: "https://linkedin.com/company/ecomargin",
    twitter: "https://twitter.com/ecomargin",
    facebook: "https://facebook.com/ecomargin",
    copyright: "© 2026 EcoMargin Infrastructure Pvt. Ltd. All Rights Reserved."
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Footer & Contact CMS Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage Corporate Address, Phones, Emails, WhatsApp Desk, Google Maps & Copyright</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Changes</>}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Contact Info */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiMapPin /> Corporate Address & Phones
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Registered Company Name</label>
              <input type="text" className="input" value={footer.companyName} onChange={(e) => setFooter({ ...footer, companyName: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Factory & Office Address</label>
              <textarea rows="3" className="input" value={footer.address} onChange={(e) => setFooter({ ...footer, address: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Primary Sales Phone</label>
                <input type="text" className="input" value={footer.phone} onChange={(e) => setFooter({ ...footer, phone: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Alt / Support Phone</label>
                <input type="text" className="input" value={footer.altPhone} onChange={(e) => setFooter({ ...footer, altPhone: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Sales Email</label>
                <input type="email" className="input" value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Support Email</label>
                <input type="email" className="input" value={footer.supportEmail} onChange={(e) => setFooter({ ...footer, supportEmail: e.target.value })} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>WhatsApp Sales Desk Number (with country code)</label>
              <input type="text" className="input" value={footer.whatsapp} onChange={(e) => setFooter({ ...footer, whatsapp: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Maps & Social Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiGlobe /> Maps & Hours
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Business Hours</label>
                <input type="text" className="input" value={footer.businessHours} onChange={(e) => setFooter({ ...footer, businessHours: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Google Maps Embed URL</label>
                <input type="text" className="input" value={footer.googleMapsEmbedUrl} onChange={(e) => setFooter({ ...footer, googleMapsEmbedUrl: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Social Media & Copyright</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>LinkedIn URL</label>
                <input type="text" className="input" value={footer.linkedin} onChange={(e) => setFooter({ ...footer, linkedin: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Copyright Notice</label>
                <input type="text" className="input" value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
