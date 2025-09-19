'use client';

import { FC } from 'react';

import {
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  GallerySection,
  HeroSection,
  PhilosophySection,
  ServicesSection,
} from '@/views/landing/components';

export const LandingView: FC = () => {
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
