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
  title: 'EcoMargin LLP | EV Charging Solutions & Infrastructure India',
  description: 'EcoMargin LLP provides EV charging solutions, EV chargers, charging infrastructure, installation, software and support for commercial, industrial and public charging applications in India.',
  keywords: 'EcoMargin, Ecomargin, EcoMargin LLP, Eco Margin, EcoMargin EV, EV charger manufacturer India, EV charging company India, EV charging solutions India, EV charging infrastructure, AC EV charger, DC fast charger, OCPP software, fleet EV charging, EV charger installation',
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
