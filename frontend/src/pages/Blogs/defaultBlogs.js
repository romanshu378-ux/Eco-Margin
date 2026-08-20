// EcoMargin Frontend — Default Technical Whitepapers & Blogs Data
// src/pages/Blogs/defaultBlogs.js

export const DEFAULT_BLOGS = [
  {
    id: 1,
    slug: 'ev-charging-station-in-india-complete-guide-ac-dc-fast-chargers-2026',
    title: 'EV Charging Station in India: Complete Guide to AC & DC Fast Chargers (2026)',
    author: 'Dr. R. K. Sharma (CTO)',
    createdAt: '2026-02-15T00:00:00.000Z',
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    summary: 'A comprehensive technical guide to installing commercial EV charging stations in India, covering 3.3kW to 240kW AC/DC hardware, transformer capacity, grid load management, and OCPP software.',
    content: `Installing commercial EV charging stations in India requires a thorough understanding of electrical infrastructure, transformer provisioning, DISCOM load approvals, and modular hardware selection. As electric vehicle adoption accelerates across fleet operators, highway plazas, and commercial real estate, selecting the right charger configuration is essential for long-term reliability and ROI.

### 1. AC vs. DC Fast Charging Infrastructure
AC charging (3.3kW to 22kW) relies on the electric vehicle’s onboard charger to convert alternating current to direct current. These are ideal for overnight fleet depots, residential complexes, and long-stay workplace parking. 

Conversely, DC Fast Chargers (30kW to 240kW) supply direct current straight to the EV battery pack, enabling rapid charge times (0 to 80% in 20–45 minutes). Commercial highway hubs and public CPO charging hubs rely on dual-gun CCS2 DC fast stations.

### 2. Grid Power & Electrical Transformer Capacity
Before deploying DC fast chargers, electrical site feasibility must account for peak power demands:
- **60kW Dual Gun DC Station**: Requires 75–80 kVA dedicated grid sanction.
- **120kW Dual Gun DC Station**: Requires 150 kVA transformer capacity.
- **240kW Heavy Duty Bus Depot Station**: Requires 300 kVA dedicated transformer setup.

EcoMargin provides end-to-end EPC installation, including HT panel commissioning, isolation transformers, and DISCOM grid approval management.

### 3. OCPP 2.0.1 Software & Fleet Load Management
Modern EV charging stations must support Open Charge Point Protocol (OCPP 1.6J / 2.0.1) for automated billing, RFID access control, and dynamic load balancing. Smart CSMS integration allows operators to prevent transformer overloading during peak tariff hours.`
  },
  {
    id: 2,
    slug: 'indian-grid-standards-ev-chargers',
    title: 'Understanding Indian Grid Standards & Safety Regulations for EV Chargers',
    author: 'Dr. R. K. Sharma (CTO)',
    createdAt: '2026-02-10T00:00:00.000Z',
    coverImage: 'https://images.unsplash.com/photo-1558441719-aa34455441bd?auto=format&fit=crop&w=800&q=80',
    summary: 'A comprehensive technical overview of grid safety, surge suppression, and insulation testing mandated for EV charging infrastructure.',
    content: `Safety compliance and Indian grid stability standards are critical components of commercial EV charger deployment. Operating power electronics under wide grid voltage fluctuations (170V–480V) requires multi-tiered isolation and protection mechanisms.

### Key Safety Mechanisms Required:
1. **Built-in Isolation Transformers**: Prevent high-frequency grid harmonics and electrical noise from feeding back into the supply grid.
2. **Surge Suppression & Galvanic Isolation**: Protect sensitive EV onboard battery management systems (BMS) against sudden grid surges, voltage spikes, and neutral failures.
3. **Emergency Stop & Earth Leakage Detection**: Instantaneous disconnection (<20ms) upon detecting insulation fault or physical emergency button activation.

EcoMargin's entire commercial product range is tested and engineered to deliver maximum uptime under harsh Indian grid conditions.`
  },
  {
    id: 3,
    slug: 'thermal-management-ip55-enclosures-ev-chargers',
    title: 'Why Thermal Management & IP55 Enclosures Matter in 50°C Summers',
    author: 'EcoMargin R&D Team',
    createdAt: '2026-01-28T00:00:00.000Z',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    summary: 'How active liquid cooling and wide voltage tolerance prevent thermal throttling during peak Indian summer ambient temperatures.',
    content: `Indian summers present extreme operational challenges for power electronics, with ambient temperatures regularly exceeding 45°C to 50°C in industrial corridors and highway hubs. Without robust thermal management, EV chargers suffer severe thermal throttling, output current derating, or premature component failure.

### Industrial-Grade Design Architecture:
- **IP55 Galvanized Weatherproof Cabinets**: Completely sealed against heavy dust, monsoonal rainfall, and environmental contaminants.
- **Forced-Air & Liquid Cooling Ducts**: Intelligently monitored fan speed controllers maintain optimal internal temperatures across high-power silicon carbide (SiC) power modules.
- **Anti-Corrosion Powder Coating**: Built to withstand outdoor highway conditions for 10+ years without cabinet degradation.`
  }
]
