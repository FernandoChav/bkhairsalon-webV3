import { motion } from 'framer-motion';

export const GallerySection = () => {
  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          className="text-5xl md:text-6xl mb-12 text-foreground"
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
            className="row-span-2 bg-accent/30 aspect-[3/4]"
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">
                Foto Vertical
              </span>
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
              className="aspect-square bg-accent/40"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  Foto Cuadrada
                </span>
              </div>
            </motion.div>
          ))}

          {/* Horizontal image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            whileHover={{ scale: 1.02 }}
            className="col-span-2 aspect-[2/1] bg-accent/30"
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">
                Foto Horizontal
              </span>
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
            <div className="w-full h-full bg-accent/40 rounded-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">
                Foto Circular
              </span>
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
              className="aspect-square bg-accent/30"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  Foto {i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
