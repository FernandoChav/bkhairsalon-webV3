import { motion } from 'framer-motion';
import { Heart, Scissors, Sparkles } from 'lucide-react';

export const ServicesSection = () => {
  return (
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
  );
};
