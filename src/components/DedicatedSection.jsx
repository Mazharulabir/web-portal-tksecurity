import { motion } from 'framer-motion'
import { HiShieldCheck } from 'react-icons/hi'

const secureItems = [
  'High-rise properties',
  'Construction projects',
  'Banks and financial organizations',
  'Hospitals and healthcare facilities',
  'Residential gated communities',
  'Shopping malls and retail centers',
]

export default function DedicatedSection() {
  return (
    <section className="relative py-24 z-10 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:w-[45%] w-full"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-blue-500/8 rounded-3xl blur-2xl" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                <img
                  src="/images/dedicated-section.jpg"
                  alt="TK Security Team"
                  className="w-full h-full min-h-[400px] lg:min-h-[500px] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:w-[55%] w-full"
          >
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
              About Us
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 mb-2 leading-snug">
              WE{' '}
              <span className="gradient-text">TK Security INC</span>
            </h2>
            <h3 className="text-lg sm:text-xl text-slate-300 font-medium mb-6">
              Dedicated to Serving with Pride
            </h3>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              We proudly secure:
            </p>

            {/* Secure Items List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {secureItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/25 transition-colors">
                    <HiShieldCheck className="text-blue-400 text-sm" />
                  </div>
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
