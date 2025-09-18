import { motion, useInView } from 'framer-motion';

import { useRef } from 'react';

export const PhilosophySection = () => {
  const philosophyRef = useRef(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true });

  return (
    <section ref={philosophyRef} className="relative py-32 overflow-hidden">
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
          siempre la autenticidad de cada persona. Porque un cabello cuidado no
          solo embellece, también empodera.
        </motion.p>
      </div>
    </section>
  );
};
