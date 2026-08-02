import React from 'react'
import SEO from '@seo/SEO'

// Corporate Sections
import HeroSection from './sections/HeroSection'
import IntroSection from './sections/IntroSection'
import ProductsSection from './sections/ProductsSection'
import ManufacturingSection from './sections/ManufacturingSection'
import ServicesSection from './sections/ServicesSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import CounterSection from './sections/CounterSection'
import IndustriesSection from './sections/IndustriesSection'
import GallerySection from './sections/GallerySection'
import BlogsSection from './sections/BlogsSection'
import FAQSection from './sections/FAQSection'
import ContactCTASection from './sections/ContactCTASection'

export default function HomePage() {
  return (
    <>
      <SEO 
        title="EcoMargin | EV Charger Manufacturer & EPC Infrastructure Company" 
        description="EcoMargin manufactures 3.3kW–240kW commercial AC & DC EV chargers, OCPP Cloud CSMS software, and turnkey EPC charging station installation services."
      />
      
      {/* 1. Animated Corporate Hero */}
      <HeroSection />
      
      {/* 2. Company Introduction */}
      <IntroSection />
      
      {/* 3. EV Charger Manufacturing Spectrum (3.3kW to 240kW) */}
      <ProductsSection />
      
      {/* 4. Manufacturing Plant & QA Testing Lab */}
      <ManufacturingSection />

      {/* 5. EPC Installation & AMC Services */}
      <ServicesSection />
      
      {/* 6. Why Choose EcoMargin */}
      <WhyChooseUsSection />
      
      {/* 7. Counter Stats */}
      <CounterSection />
      
      {/* 8. Industries Served (Highways, Fleets, Bus Depots, Hotels) */}
      <IndustriesSection />
      
      {/* 9. Projects & Installation Gallery */}
      <GallerySection />
      
      {/* 10. Industry Insights / Blogs */}
      <BlogsSection />
      
      {/* 11. FAQ */}
      <FAQSection />
      
      {/* 12. Contact Sales CTA */}
      <ContactCTASection />
    </>
  )
}
