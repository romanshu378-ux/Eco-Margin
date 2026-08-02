import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords }) {
  const siteName = 'EcoMargin'
  const defaultDesc = 'Production-ready Enterprise EV Charging Management Platform.'
  const defaultKeywords = 'EV, Electric Vehicle, Charging Station, EcoMargin, Booking, Map'

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </Helmet>
  )
}
