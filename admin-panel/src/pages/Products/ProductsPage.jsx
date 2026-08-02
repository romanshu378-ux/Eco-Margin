// EcoMargin Admin Panel — Product Management CMS (20+ Technical Spec Fields)
// src/pages/Products/ProductsPage.jsx
import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiCheck, FiX, FiFileText, FiStar } from 'react-icons/fi';

const initialProducts = [
  {
    id: 1,
    name: 'EcoWall 7.4kW AC Single Phase Charger',
    category: 'AC EV Chargers',
    power: '7.4kW',
    voltage: '230V AC ± 15%',
    current: '32A Single Phase',
    connector: 'Type 2 Gun (IEC 62196-2)',
    protection: 'IP55 / IK10 Vandal Proof',
    efficiency: '>98%',
    dimensions: '350 x 240 x 140 mm',
    weight: '6.5 kg',
    warranty: '3 Years Warranty',
    description: 'Compact commercial AC wallbox charger with integrated RFID reader and OCPP 2.0.1 cloud connectivity.',
    applications: 'Apartments, Hotels, Office Garages',
    datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/7.4kW-AC.pdf',
    brochurePdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/brochures/7.4kW-Brochure.pdf',
    videoUrl: '',
    status: 'Active',
    featured: true,
    displayOrder: 1,
    seoTitle: '7.4kW AC Charger Manufacturer India',
    seoDescription: 'ARAI certified 7.4kW AC Type 2 charger for commercial real estate.'
  },
  {
    id: 2,
    name: 'EcoPower 3.3kW LVDC Fleet Charger',
    category: 'LVDC Chargers',
    power: '3.3kW LVDC',
    voltage: '48V – 96V DC',
    current: '50A DC Output',
    connector: 'Custom Heavy-Duty Anderson Connector',
    protection: 'IP65 Dust & Water Tight',
    efficiency: '≥94%',
    dimensions: '300 x 200 x 120 mm',
    weight: '4.8 kg',
    warranty: '2 Years Warranty',
    description: 'Low-Voltage DC Charger designed for 2-wheeler, 3-wheeler fleets, e-rickshaws, and light commercial EVs.',
    applications: 'Last-Mile Fleet Depots, E-Rickshaw Hubs',
    datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/3.3kW-LVDC.pdf',
    brochurePdf: '',
    videoUrl: '',
    status: 'Active',
    featured: true,
    displayOrder: 2,
    seoTitle: '3.3kW LVDC Charger Manufacturer for E-3W & Fleets',
    seoDescription: 'High efficiency 48V-96V LVDC fast charger.'
  },
  {
    id: 3,
    name: 'EcoCharge 60kW Dual Gun DC Fast Charger',
    category: 'DC Fast Chargers',
    power: '60kW DC',
    voltage: '200V – 1000V DC Output',
    current: '200A Continuous',
    connector: 'Dual CCS2 Heavy-Duty Guns',
    protection: 'IP55 Outdoor Weatherproof Cabinet',
    efficiency: '≥95.5%',
    dimensions: '1600 x 750 x 550 mm',
    weight: '280 kg',
    warranty: '3 Years On-Site AMC Included',
    description: 'Heavy duty commercial DC fast charger with dynamic dual-gun power splitting and 7-inch touchscreen.',
    applications: 'Highway Fuel Stations, CPO Networks, Fleet Depots',
    datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/60kW-DC.pdf',
    brochurePdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/brochures/60kW-Brochure.pdf',
    videoUrl: 'https://res.cloudinary.com/ecomargin/video/upload/v1/60kw-demo.mp4',
    status: 'Active',
    featured: true,
    displayOrder: 3,
    seoTitle: '60kW Dual Gun DC Fast Charger OEM Factory India',
    seoDescription: 'Dual CCS2 60kW DC Fast Charging Station for Highways and Fleet Depots.'
  },
  {
    id: 4,
    name: 'EcoCharge 120kW Ultra-Fast DC Station',
    category: 'DC Fast Chargers',
    power: '120kW DC',
    voltage: '200V – 1000V DC Output',
    current: '300A Continuous (Cooled Cable Option)',
    connector: 'Dual CCS2 / GB/T Interface',
    protection: 'IP55 Vandal Proof Outdoor Enclosure',
    efficiency: '≥96%',
    dimensions: '1850 x 850 x 650 mm',
    weight: '420 kg',
    warranty: '3 Years Comprehensive Warranty',
    description: 'Ultra-fast highway DC charging station capable of charging two passenger EVs or e-buses simultaneously.',
    applications: 'Expressways, Public CPOs, EV Bus Terminals',
    datasheetPdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/specs/120kW-DC.pdf',
    brochurePdf: 'https://res.cloudinary.com/ecomargin/raw/upload/v1/brochures/120kW-Brochure.pdf',
    videoUrl: '',
    status: 'Active',
    featured: true,
    displayOrder: 4,
    seoTitle: '120kW Ultra Fast DC Station Manufacturer',
    seoDescription: '120kW Dual CCS2 DC Fast Charger with 0 to 80% charge in 25 mins.'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    name: '',
    category: 'AC EV Chargers',
    power: '7.4kW',
    voltage: '230V AC',
    current: '32A',
    connector: 'Type 2 Gun',
    protection: 'IP55',
    efficiency: '>98%',
    dimensions: '350 x 240 x 140 mm',
    weight: '6 kg',
    warranty: '3 Years',
    description: '',
    applications: '',
    datasheetPdf: '',
    brochurePdf: '',
    videoUrl: '',
    status: 'Active',
    featured: false,
    displayOrder: 1,
    seoTitle: '',
    seoDescription: ''
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData(prod);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.power.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ padding: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>EV Charger Product Catalog CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage AC Chargers (3.3kW–22kW), LVDC Chargers (3.3kW–6.6kW), & DC Fast Stations (20kW–240kW)</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Add New Charger Model
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'AC EV Chargers', 'LVDC Chargers', 'DC Fast Chargers'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn ${filterCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            placeholder="Search by model or power..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Model Name</th>
              <th style={{ padding: '0.75rem 1rem' }}>Category</th>
              <th style={{ padding: '0.75rem 1rem' }}>Power Output</th>
              <th style={{ padding: '0.75rem 1rem' }}>Connector</th>
              <th style={{ padding: '0.75rem 1rem' }}>IP Protection</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>
                  {p.featured && <FiStar style={{ color: '#F59E0B', marginRight: '0.35rem' }} />}
                  {p.name}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary)' }}>{p.power}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{p.connector}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{p.protection}</td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(p)} className="btn btn-outline" style={{ padding: '0.4rem' }} title="Edit Specs">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Form Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingProduct ? `Edit Specifications: ${editingProduct.name}` : 'Add New EV Charger Model'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.25rem', cursor: 'pointer' }}><FiX /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* General Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Model Name *</label>
                  <input type="text" required className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Category *</label>
                  <select className="input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="AC EV Chargers">AC EV Chargers</option>
                    <option value="LVDC Chargers">LVDC Chargers</option>
                    <option value="DC Fast Chargers">DC Fast Chargers</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Power Rating *</label>
                  <select className="input" value={formData.power} onChange={e => setFormData({ ...formData, power: e.target.value })}>
                    <option value="3.3kW LVDC">3.3kW LVDC</option>
                    <option value="6.6kW LVDC">6.6kW LVDC</option>
                    <option value="3.3kW">3.3kW AC</option>
                    <option value="7.4kW">7.4kW AC</option>
                    <option value="11kW">11kW AC</option>
                    <option value="22kW">22kW AC</option>
                    <option value="20kW DC">20kW DC</option>
                    <option value="30kW DC">30kW DC</option>
                    <option value="40kW DC">40kW DC</option>
                    <option value="60kW DC">60kW DC</option>
                    <option value="80kW DC">80kW DC</option>
                    <option value="120kW DC">120kW DC</option>
                    <option value="160kW DC">160kW DC</option>
                    <option value="240kW DC">240kW DC</option>
                  </select>
                </div>
              </div>

              {/* Electrical Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Input Voltage</label>
                  <input type="text" className="input" value={formData.voltage} onChange={e => setFormData({ ...formData, voltage: e.target.value })} placeholder="230V AC / 415V AC" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Max Current</label>
                  <input type="text" className="input" value={formData.current} onChange={e => setFormData({ ...formData, current: e.target.value })} placeholder="32A / 200A DC" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Connector Type</label>
                  <input type="text" className="input" value={formData.connector} onChange={e => setFormData({ ...formData, connector: e.target.value })} placeholder="CCS2 / Type 2" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Efficiency</label>
                  <input type="text" className="input" value={formData.efficiency} onChange={e => setFormData({ ...formData, efficiency: e.target.value })} placeholder="≥96%" />
                </div>
              </div>

              {/* Mechanical Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>IP Protection</label>
                  <input type="text" className="input" value={formData.protection} onChange={e => setFormData({ ...formData, protection: e.target.value })} placeholder="IP55 / IP65" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Dimensions</label>
                  <input type="text" className="input" value={formData.dimensions} onChange={e => setFormData({ ...formData, dimensions: e.target.value })} placeholder="350 x 240 x 140 mm" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Weight</label>
                  <input type="text" className="input" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} placeholder="6.5 kg" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Warranty</label>
                  <input type="text" className="input" value={formData.warranty} onChange={e => setFormData({ ...formData, warranty: e.target.value })} placeholder="3 Years AMC Included" />
                </div>
              </div>

              {/* Media Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Datasheet PDF URL</label>
                  <input type="url" className="input" value={formData.datasheetPdf} onChange={e => setFormData({ ...formData, datasheetPdf: e.target.value })} placeholder="https://res.cloudinary.com/...pdf" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Brochure PDF URL</label>
                  <input type="url" className="input" value={formData.brochurePdf} onChange={e => setFormData({ ...formData, brochurePdf: e.target.value })} placeholder="https://res.cloudinary.com/...pdf" />
                </div>
              </div>

              {/* Descriptions & Applications */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Product Description</label>
                <textarea rows="2" className="input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Applications (Comma Separated)</label>
                <input type="text" className="input" value={formData.applications} onChange={e => setFormData({ ...formData, applications: e.target.value })} placeholder="Highways, Bus Depots, Hotels, Apartments" />
              </div>

              {/* Status & Options */}
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Status</label>
                  <select className="input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                  Featured Product Flag
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Specifications</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
