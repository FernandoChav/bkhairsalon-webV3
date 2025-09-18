'use client';

import {
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  Footer,
  GallerySection,
  HeroSection,
  Navigation,
  PhilosophySection,
  ServicesSection,
} from '@/views/landing/components';

export const LandingView = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <ServicesSection />
      <CertificationsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};
