import { motion, useScroll, useTransform } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

import { FC, useRef } from 'react';

export const HeroSection: FC = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Text reveal animations
  const textY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center"
    >
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"
      />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-64 h-64 bg-accent/40 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-6">
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
              className="h-[1px] bg-primary mb-8"
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
                className="block text-5xl md:text-7xl lg:text-8xl text-muted-foreground ml-12"
              >
                Karamanos
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base text-muted-foreground mb-8 uppercase tracking-[0.3em] ml-12"
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
                <HiChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-2 transition-transform" />
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
              className="absolute inset-0 bg-gradient-to-b from-accent/30 to-accent/50"
              style={{
                clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder for main image */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Imagen Principal
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <HiChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
