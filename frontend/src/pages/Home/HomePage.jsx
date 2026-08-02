import React from 'react'
import SEO from '@seo/SEO'

// Import all 15 sections
import HeroSection from './sections/HeroSection'
import IntroSection from './sections/IntroSection'
import ServicesSection from './sections/ServicesSection'
import ProductsSection from './sections/ProductsSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import CounterSection from './sections/CounterSection'
import IndustriesSection from './sections/IndustriesSection'
import TimelineSection from './sections/TimelineSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ClientsSection from './sections/ClientsSection'
import GallerySection from './sections/GallerySection'
import BlogsSection from './sections/BlogsSection'
import FAQSection from './sections/FAQSection'
import ContactCTASection from './sections/ContactCTASection'
import NewsletterSection from './sections/NewsletterSection'

export default function HomePage() {
  return (
    <>
      <SEO 
        title="EcoMargin | Intelligent EV Charging Platform" 
        description="The ultimate Cloud software and mobile app ecosystem for EV charging station operators, fleets, and drivers."
      />
      
      {/* 1. Animated Hero */}
      <HeroSection />
      
      {/* 2. Company Introduction */}
      <IntroSection />
      
      {/* 3. Our Services */}
      <ServicesSection />
      
      {/* 4. Products */}
      <ProductsSection />
      
      {/* 5. Why Choose EcoMargin */}
      <WhyChooseUsSection />
      
      {/* 6. Counter */}
      <CounterSection />
      
      {/* 7. Industries */}
      <IndustriesSection />
      
      {/* 8. Timeline */}
      <TimelineSection />
      
      {/* 9. Testimonials */}
      <TestimonialsSection />
      
      {/* 10. Clients */}
      <ClientsSection />
      
      {/* 11. Gallery Preview */}
      <GallerySection />
      
      {/* 12. Latest Blogs */}
      <BlogsSection />
      
      {/* 13. FAQ */}
      <FAQSection />
      
      {/* 14. Contact CTA */}
      <ContactCTASection />
      
      {/* 15. Newsletter */}
      <NewsletterSection />
      
      {/* 16. Footer (Handled automatically by MainLayout wrapper in AppRoutes.jsx) */}
    </>
  )
}
