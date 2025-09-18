import { motion } from 'framer-motion';
import { FaAward, FaPalette } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export const ExperienceSection = () => {
  return (
    <section className="py-20 bg-white">
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
            Estilista y colorista con más de 10 años de trayectoria en el rubro
            de la belleza. Con experiencia en pasarelas, certámenes de belleza y
            producciones cinematográficas.
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
              <FaAward className="w-8 h-8 mb-4" />
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
            <HiSparkles className="w-8 h-8 mb-4 text-gray-600" />
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Mister Antofagasta
            </h3>
            <p className="text-gray-600 text-sm mb-2">2019</p>
            <p className="text-sm text-gray-600">Jurado oficial del certamen</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="md:col-span-3 md:col-start-10 bg-gray-900 text-white p-6"
          >
            <FaPalette className="w-6 h-6 mb-3" />
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
  );
};
