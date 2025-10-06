import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { HiCalendar, HiChevronDown, HiLocationMarker } from 'react-icons/hi';

import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/shadcn';
import { ScrollingMarquee } from '@/components/ui';

import {
  LandingCard,
  LandingGrid,
  LandingSection,
  SectionHeader,
} from './components';

const brands = [
  'REDKEN',
  'WELLA',
  'REVLON',
  "L'ORÉAL",
  'TIGI',
  'TRUSS',
  'MANIC PANIC NYC',
];

const portfolioImages = [
  {
    id: 1,
    variant: 'accent' as const,
    text: 'Foto 1',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 2,
    variant: 'primary' as const,
    text: 'Foto 2',
    textClassName: 'text-sm text-primary-foreground',
  },
  {
    id: 3,
    variant: 'accent' as const,
    text: 'Foto 3',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 4,
    variant: 'primary' as const,
    text: 'Foto 4',
    textClassName: 'text-sm text-primary-foreground',
  },
  {
    id: 5,
    variant: 'accent' as const,
    text: 'Foto 5',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 6,
    variant: 'primary' as const,
    text: 'Foto 6',
    textClassName: 'text-sm text-primary-foreground',
  },
  {
    id: 7,
    variant: 'accent' as const,
    text: 'Foto 7',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 8,
    variant: 'primary' as const,
    text: 'Foto 8',
    textClassName: 'text-sm text-primary-foreground',
  },
  {
    id: 9,
    variant: 'accent' as const,
    text: 'Foto 9',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 10,
    variant: 'primary' as const,
    text: 'Foto 10',
    textClassName: 'text-sm text-primary-foreground',
  },
  {
    id: 11,
    variant: 'accent' as const,
    text: 'Foto 11',
    textClassName: 'text-sm text-accent-foreground',
  },
  {
    id: 12,
    variant: 'primary' as const,
    text: 'Foto 12',
    textClassName: 'text-sm text-primary-foreground',
  },
];

const certifications = [
  {
    brand: 'Redken',
    cert: 'Shades EQ For All',
    year: '2021',
  },
  {
    brand: 'Wella',
    cert: 'Trend Vision Plex',
    year: '2018',
  },
  {
    brand: 'Revlon',
    cert: 'International Training Panamá',
    year: '2016',
  },
];

export const LandingView: FC = () => {
  return (
    <>
      <LandingSection
        background="default"
        padding="none"
        maxWidth="full"
        className="relative h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 w-full h-full max-w-none">
          {/* Mobile Layout */}
          <div className="lg:hidden h-full flex flex-col px-6 pb-8 justify-center gap-8">
            {/* Texto */}
            <div className="flex-shrink-0 space-y-3">
              <div className="space-y-1">
                <h1
                  className="text-5xl sm:text-6xl leading-[0.85] font-light"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  <span className="block text-primary">Banguelia</span>
                  <span className="block text-5xl sm:text-6xl text-primary ml-4">
                    Karamanos
                  </span>
                </h1>
              </div>

              <div className="ml-4">
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.3em] font-light leading-tight">
                  Estilista & Colorista
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.3em] font-light leading-tight">
                  Profesional Internacional
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex-1 relative min-h-0">
              <div
                className="absolute inset-0 bg-accent hover:scale-[1.02] transition-transform duration-300"
                style={{
                  clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    Imagen Principal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-24 items-center h-full px-16 xl:px-24">
            {/* Texto */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="h-[2px] bg-primary w-24" />

              <div className="space-y-4">
                <h1
                  className="text-7xl xl:text-[8rem] leading-[0.85] font-light"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  <span className="block text-primary">Banguelia</span>
                  <span className="block text-7xl xl:text-[8rem] text-primary ml-12">
                    Karamanos
                  </span>
                </h1>
              </div>

              <div className="ml-12 space-y-2">
                <p className="text-base xl:text-lg text-muted-foreground uppercase tracking-[0.4em] font-light">
                  Estilista & Colorista
                </p>
                <p className="text-base xl:text-lg text-muted-foreground uppercase tracking-[0.4em] font-light">
                  Profesional Internacional
                </p>
              </div>

              <div className="ml-12 pt-4">
                <div className="group flex items-center space-x-4 text-primary hover:text-muted-foreground transition-colors duration-300">
                  <span className="text-base uppercase tracking-wider font-medium">
                    Descubre mi arte
                  </span>
                  <HiChevronDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-3 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="relative h-[700px] flex items-center justify-center">
              <div
                className="absolute inset-0 bg-accent hover:scale-[1.02] transition-transform duration-300"
                style={{
                  clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    Imagen Principal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <HiChevronDown className="w-6 h-6 text-primary" />
        </div>
      </LandingSection>
      <LandingSection
        background="primary"
        padding="xl"
        maxWidth="7xl"
        className="relative overflow-hidden"
      >
        <div className="relative">
          <blockquote
            className="text-3xl md:text-5xl lg:text-6xl leading-tight text-center text-primary-foreground"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span className="block mb-6">&quot;Para mí, el cabello es un</span>
            <span className="block mb-6 text-primary-foreground/80 font-medium italic">
              lienzo en blanco
            </span>
            <span className="block">
              donde cada cliente trae su historia&quot;
            </span>
          </blockquote>

          <p className="text-center mt-12 text-primary-foreground/70 max-w-3xl mx-auto text-lg">
            Mi arte consiste en darle vida, color, forma y estilo, respetando
            siempre la autenticidad de cada persona. Porque un cabello cuidado
            no solo embellece, también empodera.
          </p>
        </div>
      </LandingSection>
      <LandingSection background="default" padding="lg" maxWidth="7xl">
        <SectionHeader
          title="Trayectoria"
          description="Estilista y colorista con más de 10 años de trayectoria en el rubro de la belleza. Con experiencia en pasarelas, certámenes de belleza y producciones cinematográficas."
          className="text-left"
        />

        <LandingGrid columns={{ default: 1, md: 3 }} gap="md">
          <LandingCard variant="primary" size="md">
            <h3
              className="text-2xl mb-4 text-primary-foreground"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Fashion Week
            </h3>
            <p className="mb-2 text-primary-foreground/70">2015</p>
            <p className="text-sm text-primary-foreground/70">
              Peinadora oficial en Fashion Week Antofagasta
            </p>
          </LandingCard>

          <LandingCard variant="accent" size="md">
            <h3
              className="text-2xl mb-4 text-accent-foreground"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Mister Antofagasta
            </h3>
            <p className="mb-2 text-accent-foreground/70">2019</p>
            <p className="text-sm text-accent-foreground/70">
              Jurado oficial del certamen
            </p>
          </LandingCard>

          <LandingCard variant="primary" size="md">
            <h3
              className="text-2xl mb-4 text-primary-foreground"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Cine Nacional
            </h3>
            <p className="mb-2 text-primary-foreground/70">2017</p>
            <p className="text-sm text-primary-foreground/70">
              Estilista en producciones cinematográficas
            </p>
          </LandingCard>
        </LandingGrid>
      </LandingSection>
      <LandingSection
        background="default"
        padding="lg"
        maxWidth="7xl"
        className="text-right"
      >
        <SectionHeader title="Especialidades" />

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          <div className="md:row-span-2 h-full">
            <LandingCard variant="primary" className="h-full" size="md">
              <h3
                className="text-2xl mb-4 text-primary-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Coloración Profesional
              </h3>
              <ul className="space-y-2 text-primary-foreground">
                <li>• Balayage personalizado</li>
                <li>• Rubios perfectos</li>
                <li>• Corrección de color</li>
                <li>• Técnicas vanguardistas</li>
              </ul>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground rounded-full blur-2xl opacity-5" />
            </LandingCard>
          </div>

          <div className="h-full">
            <LandingCard variant="accent" className="h-full" size="md">
              <h3
                className="text-2xl mb-4 text-accent-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Cortes
              </h3>
              <p className="text-sm text-accent-foreground/70">
                Modernos y clásicos
              </p>
            </LandingCard>
          </div>

          <div className="h-full">
            <LandingCard variant="primary" className="h-full" size="md">
              <h3
                className="text-2xl mb-4 text-primary-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Tratamientos
              </h3>
              <p className="text-sm text-primary-foreground/70">
                Cuidado integral
              </p>
            </LandingCard>
          </div>

          <div className="md:col-span-2 h-full">
            <LandingCard variant="accent" className="h-full" size="md">
              <h3
                className="text-2xl mb-4 text-accent-foreground"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Eventos & Pasarela
              </h3>
              <p className="text-sm text-accent-foreground/70">
                Peinados sofisticados para ocasiones especiales
              </p>
            </LandingCard>
          </div>
        </div>
      </LandingSection>
      <LandingSection
        background="muted"
        padding="lg"
        maxWidth="7xl"
        className="overflow-hidden"
      >
        <div className="mb-12">
          <SectionHeader
            title="Formación Internacional"
            className="text-left"
          />
        </div>

        <div className="mt-16">
          <LandingGrid columns={{ default: 1, md: 3 }} gap="md">
            {certifications.map(item => (
              <LandingCard
                key={item.brand}
                variant="primary"
                className="text-center"
                size="md"
              >
                <h3
                  className="text-2xl mb-4 text-primary-foreground"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {item.brand}
                </h3>
                <p className="mb-2 text-primary-foreground/70">{item.year}</p>
                <p className="text-sm text-primary-foreground/70">
                  {item.cert}
                </p>
              </LandingCard>
            ))}
          </LandingGrid>
        </div>

        <div className="relative py-8">
          <ScrollingMarquee
            items={brands}
            className="text-2xl md:text-3xl"
            separator="dot"
            speed="fast"
            fullWidth={true}
          />
        </div>
      </LandingSection>
      <LandingSection background="default" padding="lg" maxWidth="7xl">
        <SectionHeader title="Portfolio" className="mb-12 text-right" />

        <LandingGrid columns={{ default: 1, md: 3, lg: 4 }} gap="md">
          {portfolioImages.map(image => (
            <LandingCard
              key={image.id}
              variant={image.variant}
              className="h-80 hover:scale-105 transition-transform duration-300"
              size="md"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className={image.textClassName}>{image.text}</span>
              </div>
            </LandingCard>
          ))}
        </LandingGrid>
      </LandingSection>
      <LandingSection
        background="muted"
        padding="none"
        maxWidth="full"
        className="relative"
      >
        <div className="h-[400px] md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d261.7207145205899!2d-70.40417710304605!3d-23.673887425107537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96afd5a0a8a656bb%3A0x661b71bbcb9ebfd9!2sBanguelia%20BKhairsalon!5e0!3m2!1sen!2scl!4v1758226069724!5m2!1sen!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Banguelia Karamanos Hair Salon Location"
          />
        </div>
      </LandingSection>
      <LandingSection
        background="default"
        padding="xl"
        maxWidth="7xl"
        className="relative"
      >
        <div className="grid md:grid-cols-2 -mx-6 md:mx-0">
          <div className="bg-primary text-primary-foreground p-6 md:p-20">
            <h2
              className="text-5xl md:text-6xl mb-12"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Encuéntranos
            </h2>

            <div className="space-y-8">
              <a
                href="https://www.google.com/maps/search/Nicanor+Plaza+1070,+local+2,+Antofagasta,+Chile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <HiLocationMarker className="w-5 h-5 text-primary-foreground/60 mt-1" />
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">
                    Ubicación
                  </p>
                  <p className="text-lg">Nicanor Plaza 1070, local 2</p>
                  <p className="text-primary-foreground/60">
                    Antofagasta, Chile
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/banguelia_hairsalon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <FaInstagram className="w-5 h-5 text-primary-foreground/60 mt-1" />
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">
                    Instagram
                  </p>
                  <p className="text-lg">@banguelia_hairsalon</p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@bangelia.hairsalon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <FaTiktok className="w-5 h-5 text-primary-foreground/60 mt-1" />
                <div>
                  <p className="text-sm text-primary-foreground/60 mb-1">
                    TikTok
                  </p>
                  <p className="text-lg">@bangelia.hairsalon</p>
                </div>
              </a>
            </div>

            <p
              className="mt-16 text-2xl italic text-primary-foreground/60"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &quot;Tu estilo es mi compromiso,
              <br />
              tu confianza mi mayor logro.&quot;
            </p>
          </div>

          <div className="bg-muted p-6 md:p-20 flex flex-col justify-center items-center text-center">
            <HiCalendar className="w-12 h-12 text-foreground" />

            <h3
              className="text-3xl mb-6 text-foreground"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Reserva tu cita
            </h3>

            <p className="text-muted-foreground mb-8 max-w-md">
              Reserva tus citas de manera digital y sin complicaciones.
            </p>

            <div className="w-full max-w-sm">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href="/register">Crear cuenta y agendar</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              ¿Ya tienes cuenta?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </LandingSection>
    </>
  );
};
