import { motion } from 'framer-motion';

export const CertificationsSection = () => {
  const brands = [
    'REDKEN',
    'WELLA',
    'REVLON',
    "L'ORÉAL",
    'TIGI',
    'TRUSS',
    'MANIC PANIC NYC',
  ];

  const certifications = [
    { brand: 'Redken', cert: 'Shades EQ For All', year: '2021' },
    { brand: 'Wella', cert: 'Trend Vision Plex', year: '2018' },
    {
      brand: 'Revlon',
      cert: 'International Training Panamá',
      year: '2016',
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
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
          {brands.map((brand, i) => (
            <span
              key={i}
              className="text-gray-300"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {brand} •
            </span>
          ))}
          {brands.map((brand, i) => (
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
          {certifications.map((item, index) => (
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
  );
};
