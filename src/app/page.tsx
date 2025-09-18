'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Award,
  ChevronDown,
  Clock,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Palette,
  Phone,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react';

import { useRef, useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true });

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Text reveal animations
  const textY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-black z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm top-0"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              BK Hair Salon
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                'Inicio',
                'Filosofía',
                'Experiencia',
                'Servicios',
                'Formación',
                'Contacto',
              ].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xs uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white"
        >
          <div className="px-6 py-4 space-y-4">
            {[
              'Inicio',
              'Filosofía',
              'Experiencia',
              'Servicios',
              'Formación',
              'Contacto',
            ].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm uppercase tracking-wider hover:text-gray-600"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section - Asymmetric Split */}
      <section
        ref={heroRef}
        id="inicio"
        className="relative min-h-screen flex items-center justify-center"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
        />

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 bg-gray-300 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-6 pt-20">
          <motion.div
            style={{ opacity: heroOpacity, y: textY }}
            className="grid md:grid-cols-12 gap-8 items-center min-h-[80vh]"
          >
            {/* Left Content - Offset Grid */}
            <motion.div
              className="md:col-span-7 md:col-start-2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[1px] bg-black mb-8"
              />

              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl mb-6 leading-[0.9]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  Banguelia
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block text-5xl md:text-7xl lg:text-8xl text-gray-400 ml-12"
                >
                  Karamanos
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm md:text-base text-gray-600 mb-8 uppercase tracking-[0.3em] ml-12"
              >
                Estilista & Colorista
                <br />
                Profesional Internacional
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center space-x-8 ml-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-3"
                >
                  <span className="text-sm uppercase tracking-wider">
                    Descubre mi arte
                  </span>
                  <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Image Placeholder - Geometric Shape */}
            <motion.div
              className="md:col-span-4 relative h-[500px] md:h-[700px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300"
                style={{
                  clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Placeholder for main image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    Imagen Principal
                  </span>
                </div>
              </motion.div>

              {/* Floating accent element */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-black rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Philosophy Section - Full Width Quote */}
      <section
        ref={philosophyRef}
        id="filosofía"
        className="relative py-32 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white"
          initial={{ scaleX: 0 }}
          animate={isPhilosophyInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
        />

        <div className="relative container mx-auto px-6 max-w-7xl">
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isPhilosophyInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl leading-tight text-center"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="block mb-6"
            >
              &quot;Para mí, el cabello es un
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="block mb-6 text-gray-400"
            >
              lienzo en blanco
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="block text-2xl md:text-3xl lg:text-4xl"
            >
              donde cada cliente trae su historia&quot;
            </motion.span>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
            className="text-center mt-12 text-gray-600 max-w-3xl mx-auto text-lg"
          >
            Mi arte consiste en darle vida, color, forma y estilo, respetando
            siempre la autenticidad de cada persona. Porque un cabello cuidado
            no solo embellece, también empodera.
          </motion.p>
        </div>
      </section>

      {/* Experience Section - Timeline Style */}
      <section id="experiencia" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="mb-16"
          >
            <h2
              className="text-5xl md:text-6xl mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Trayectoria
            </h2>
            <p className="text-gray-600 max-w-3xl text-lg">
              Estilista y colorista con más de 10 años de trayectoria en el
              rubro de la belleza. Con experiencia en pasarelas, certámenes de
              belleza y producciones cinematográficas.
            </p>
          </motion.div>

          {/* Experience Cards - Asymmetric Layout */}
          <div className="grid md:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              className="md:col-span-5 bg-black text-white p-8 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Award className="w-8 h-8 mb-4" />
                <h3
                  className="text-2xl mb-4"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Fashion Week
                </h3>
                <p className="text-gray-300 mb-2">2015</p>
                <p className="text-sm">
                  Peinadora oficial en Fashion Week Antofagasta
                </p>
              </div>
              <motion.div
                className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full"
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              className="md:col-span-4 md:col-start-7 md:row-start-1 bg-gray-100 p-8 mt-12"
            >
              <Sparkles className="w-8 h-8 mb-4 text-gray-600" />
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Mister Antofagasta
              </h3>
              <p className="text-gray-600 text-sm mb-2">2019</p>
              <p className="text-sm text-gray-600">
                Jurado oficial del certamen
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              className="md:col-span-3 md:col-start-10 bg-gray-900 text-white p-6"
            >
              <Palette className="w-6 h-6 mb-3" />
              <h3 className="text-lg mb-2">Cine Nacional</h3>
              <p className="text-xs text-gray-300">Estilista en producciones</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              className="md:col-span-6 md:col-start-4 bg-gradient-to-r from-gray-100 to-gray-200 p-8 -mt-8"
            >
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Salones Premium
              </h3>
              <p className="text-gray-600">
                Experiencia en los salones más prestigiosos de Antofagasta,
                trabajando con clientela exclusiva y técnicas de vanguardia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="mb-16"
          >
            <h2
              className="text-5xl md:text-6xl mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Especialidades
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              whileHover={{ scale: 1.02 }}
              className="col-span-2 row-span-2 bg-black text-white p-8 relative overflow-hidden"
            >
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Coloración Profesional
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Balayage personalizado</li>
                <li>• Rubios perfectos</li>
                <li>• Corrección de color</li>
                <li>• Técnicas vanguardistas</li>
              </ul>
              <motion.div
                className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 shadow-sm"
            >
              <Scissors className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Cortes</h4>
              <p className="text-xs text-gray-600">Modernos y clásicos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-200 p-6"
            >
              <Heart className="w-8 h-8 mb-3 text-gray-600" />
              <h4 className="font-semibold mb-1">Tratamientos</h4>
              <p className="text-xs text-gray-600">Cuidado integral</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="col-span-2 bg-gradient-to-r from-gray-100 to-gray-200 p-6"
            >
              <Sparkles className="w-8 h-8 mb-3 text-gray-700" />
              <h4
                className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Eventos & Pasarela
              </h4>
              <p className="text-sm text-gray-600">
                Peinados sofisticados para ocasiones especiales
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section - Marquee Style */}
      <section id="formación" className="py-20 bg-white overflow-hidden">
        <div className="mb-12">
          <h2
            className="text-5xl md:text-6xl text-center mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Formación Internacional
          </h2>
        </div>

        {/* Scrolling Marquee */}
        <div className="relative">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-12 text-2xl md:text-3xl whitespace-nowrap"
          >
            {[
              'REDKEN',
              'WELLA',
              'REVLON',
              "L'ORÉAL",
              'TIGI',
              'TRUSS',
              'MANIC PANIC NYC',
            ].map((brand, i) => (
              <span
                key={i}
                className="text-gray-300"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {brand} •
              </span>
            ))}
            {[
              'REDKEN',
              'WELLA',
              'REVLON',
              "L'ORÉAL",
              'TIGI',
              'TRUSS',
              'MANIC PANIC NYC',
            ].map((brand, i) => (
              <span
                key={`${i}-2`}
                className="text-gray-300"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {brand} •
              </span>
            ))}
          </motion.div>
        </div>

        {/* Certification Grid */}
        <div className="container mx-auto px-6 max-w-6xl mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { brand: 'Redken', cert: 'Shades EQ For All', year: '2021' },
              { brand: 'Wella', cert: 'Trend Vision Plex', year: '2018' },
              {
                brand: 'Revlon',
                cert: 'International Training Panamá',
                year: '2016',
              },
            ].map((item, index) => (
              <motion.div
                key={item.brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {item.brand}
                </h3>
                <p className="text-gray-600">{item.cert}</p>
                <p className="text-sm text-gray-400 mt-2">{item.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="text-5xl md:text-6xl mb-12"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Portfolio
          </motion.h2>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large vertical image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              whileHover={{ scale: 1.02 }}
              className="row-span-2 bg-gray-200 aspect-[3/4]"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Foto Vertical</span>
              </div>
            </motion.div>

            {/* Square images */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`square-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gray-300"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Foto Cuadrada</span>
                </div>
              </motion.div>
            ))}

            {/* Horizontal image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              whileHover={{ scale: 1.02 }}
              className="col-span-2 aspect-[2/1] bg-gray-200"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Foto Horizontal</span>
              </div>
            </motion.div>

            {/* Circular image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              whileHover={{ scale: 1.02 }}
              className="aspect-square"
            >
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Foto Circular</span>
              </div>
            </motion.div>

            {/* More squares */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`more-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gray-200"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Foto {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Split Design */}
      <section id="contacto" className="relative">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Black */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="bg-black text-white p-12 md:p-20"
          >
            <h2
              className="text-5xl md:text-6xl mb-12"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Conectemos
            </h2>

            <div className="space-y-8">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Ubicación</p>
                  <p className="text-lg">Nicanor Plaza 1070, local 2</p>
                  <p className="text-gray-400">Antofagasta</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Contacto</p>
                  <p className="text-lg">+56 9 2374 5509</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <Instagram className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Instagram</p>
                  <p className="text-lg">@banguelia_hairsalon</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Horario</p>
                  <p className="text-lg">Lun - Sáb</p>
                  <p className="text-gray-400">10:00 - 20:00</p>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              className="mt-16 text-2xl italic text-gray-400"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &quot;Tu estilo es mi compromiso,
              <br />
              tu confianza mi mayor logro.&quot;
            </motion.p>
          </motion.div>

          {/* Right Side - White Form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="bg-gray-50 p-12 md:p-20"
          >
            <h3
              className="text-3xl mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Agenda tu cita
            </h3>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors"
                />
              </div>

              <div>
                <select className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors appearance-none">
                  <option>Selecciona un servicio</option>
                  <option>Coloración profesional</option>
                  <option>Corte personalizado</option>
                  <option>Tratamiento capilar</option>
                  <option>Peinado para evento</option>
                  <option>Consulta personalizada</option>
                </select>
              </div>

              <div>
                <textarea
                  placeholder="Mensaje (opcional)"
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-black text-white py-4 uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Reservar cita
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Banguelia Karamanos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
