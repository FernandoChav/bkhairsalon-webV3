'use client';

import {
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  PhilosophySection,
  ServicesSection,
} from '@/views/landing/components';

export const LandingView = () => {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <ServicesSection />
      <CertificationsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};
