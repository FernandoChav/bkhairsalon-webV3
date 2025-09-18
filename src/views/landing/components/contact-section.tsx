import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import { HiCalendar, HiClock, HiLocationMarker } from 'react-icons/hi';

import { Button } from '@/components/shadcn';

export const ContactSection = () => {
  return (
    <section className="relative">
      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
        className="h-[400px] md:h-[500px]"
      >
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
      </motion.div>

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
            Encuéntranos
          </h2>

          <div className="space-y-8">
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start space-x-4"
            >
              <HiLocationMarker className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Ubicación</p>
                <p className="text-lg">Nicanor Plaza 1070, local 2</p>
                <p className="text-gray-400">Antofagasta, Chile</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start space-x-4"
            >
              <FaInstagram className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Instagram</p>
                <p className="text-lg">@banguelia_hairsalon</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start space-x-4"
            >
              <HiClock className="w-5 h-5 text-gray-400 mt-1" />
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

        {/* Right Side - White CTA */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          className="bg-gray-50 p-12 md:p-20 flex flex-col justify-center items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8"
          >
            <HiCalendar className="w-12 h-12 text-white" />
          </motion.div>

          <h3
            className="text-3xl mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Reserva tu cita
          </h3>

          <p className="text-gray-600 mb-8 max-w-md">
            Reserva tus citas de manera digital y sin complicaciones.
          </p>

          <div className="w-full max-w-sm">
            <Button
              size="lg"
              className="w-full bg-black hover:bg-gray-800 text-white"
              asChild
            >
              <a href="/register">Crear cuenta y agendar</a>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-black hover:underline">
              Inicia sesión
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
