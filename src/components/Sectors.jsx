import { motion } from 'framer-motion'
import { HiOfficeBuilding, HiLibrary, HiHome, HiShoppingCart, HiHeart, HiCube } from 'react-icons/hi'

const sectors = [
  { icon: HiOfficeBuilding, name: 'High-rise Properties' },
  { icon: HiCube, name: 'Construction Projects' },
  { icon: HiLibrary, name: 'Banks & Financial Orgs' },
  { icon: HiHeart, name: 'Hospitals & Healthcare' },
  { icon: HiHome, name: 'Residential Communities' },
  { icon: HiShoppingCart, name: 'Shopping Malls & Retail' },
]

export default function Sectors() {
  return (
    <section className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.1),_transparent_60%)]" />

          <div className="relative p-10 sm:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  TK Security Inc<br />
                  <span className="gradient-text">Dedicated to Serving with Pride</span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  TK Security is a professional security guard company based in Southern
                  California. We supply both Armed and Unarmed security officers for residential,
                  commercial, and industrial properties of all sizes.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  Our team delivers reliable, courteous, and cost-effective security services
                  tailored to each client's specific requirements.
                </p>
              </motion.div>

              {/* Right — sectors grid */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-6">We Proudly Secure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {sectors.map((sector, i) => (
                    <motion.div
                      key={sector.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-400/30 transition-colors text-center"
                    >
                      <sector.icon className="text-blue-400 text-2xl" />
                      <span className="text-sm text-slate-300 leading-tight">{sector.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
