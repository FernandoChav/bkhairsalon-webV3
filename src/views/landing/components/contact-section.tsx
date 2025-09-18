import { motion } from 'framer-motion';
import { Clock, Instagram, MapPin, Phone } from 'lucide-react';

export const ContactSection = () => {
  return (
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
  );
};
