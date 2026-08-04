// EcoMargin LLP — SEO Helper Utilities
// src/utils/seo.ts

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  robots?: string;
}

export const DEFAULT_SEO: Required<Omit<SEOMetadata, 'url' | 'canonical'>> = {
  title: 'EcoMargin | Eco Margin LLP - EV Charger Manufacturer & EV Charging Solutions',
  description: 'EcoMargin (Eco Margin LLP) is an Indian EV Charger Manufacturer providing AC Chargers, DC Fast Chargers, CCS2 Chargers, EV Charging Infrastructure, OCPP Software, EPC Services and Smart EV Charging Solutions.',
  keywords: 'EcoMargin, Eco Margin, EcoMargin LLP, EV Charger, EV Charging Station, DC Fast Charger, CCS2 Charger, AC Charger, OCPP Charger, EV Infrastructure, EV Software, EV Charger Manufacturer India, EV Charging Solutions',
  image: 'https://res.cloudinary.com/dcumpbswm/image/upload/v1785843387/dark_mfegwj.png',
  robots: 'index, follow, max-image-preview:large',
};

export const getSiteUrl = (): string => {
  return (import.meta.env.VITE_SITE_URL || 'https://www.ecomargin.in').replace(/\/$/, '');
};

export const getCanonicalUrl = (path: string): string => {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath === '/' ? '' : cleanPath}`;
};
