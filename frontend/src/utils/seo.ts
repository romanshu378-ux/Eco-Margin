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

export const PREFERRED_DOMAIN = 'https://www.ecomargin.in';

export const getSiteUrl = (): string => {
  return PREFERRED_DOMAIN;
};

export const getCanonicalUrl = (path: string = '/'): string => {
  if (!path || path === '/') {
    return `${PREFERRED_DOMAIN}/`;
  }
  // Strip query parameters and hash anchors
  const cleanPath = path.split('?')[0].split('#')[0];
  const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  // Strip trailing slashes on subroutes
  const normalizedPath = formattedPath.replace(/\/+$/, '');
  return `${PREFERRED_DOMAIN}${normalizedPath || '/'}`;
};

export const DEFAULT_SEO: Required<Omit<SEOMetadata, 'url' | 'canonical'>> = {
  title: 'EcoMargin LLP | EV Charging Solutions & Infrastructure India',
  description: 'EcoMargin LLP provides EV charging infrastructure, EV chargers, installation, OCPP software and complete electric vehicle charging solutions across India.',
  keywords: 'EcoMargin, EcoMargin LLP, EcoMargin EV, EcoMargin EV Charging, EV charging solutions India, EV charging infrastructure India, EV charger manufacturer India, EV charging station manufacturer, EV fast charger India, DC fast charger India, EV charging station installation, EV charging station solutions, EV charging infrastructure company, electric vehicle charging solutions, EV charger manufacturing, OCPP EV charging software, EV charger installation, EV charging station for businesses, commercial EV charging station, highway EV charging station',
  image: 'https://www.ecomargin.in/logo-stacked.png',
  robots: 'index, follow, max-image-preview:large',
};
