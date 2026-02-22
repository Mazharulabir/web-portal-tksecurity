import { motion } from 'framer-motion'
import { HiArrowRight, HiPhone, HiMail } from 'react-icons/hi'

export default function CTA() {
  return (
    <section id="contact" className="relative py-32 z-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-400 to-blue-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05),_transparent_60%)]" />

          <div className="relative p-12 sm:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(255,191,71,0.25)]"
            >
              Ready to Secure Your Property?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-blue-200 max-w-xl mx-auto mb-10"
            >
              Contact us today for a free consultation. Our team is available 24/7 to discuss your security needs.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:+18187075382"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-400 text-blue-900 font-semibold shadow-lg hover:bg-blue-300 transition-colors"
              >
                <HiPhone />
                Call (818) 707-5382
              </motion.a>
              <motion.a
                href="mailto:operations@tksecurityinc.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-900/80 border border-blue-400/40 text-blue-200 font-semibold hover:bg-blue-900 transition-colors"
              >
                <HiMail />
                Email Us
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-blue-300/90 mt-6"
            >
              Free consultation · 24/7 availability · No obligation
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
