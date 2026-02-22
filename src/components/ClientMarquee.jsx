import { motion } from 'framer-motion'

const clients = [
  { name: 'Ford Construction Company', logo: '/images/clients/ford-construction.png' },
  { name: 'MGA Entertainment', logo: '/images/clients/mga-entertainment.png' },
  { name: 'Essex Property Trust', logo: '/images/clients/essex-property.png' },
  { name: 'NewMark Merrill Companies', logo: '/images/clients/newmark-merrill.png' },
]

export default function ClientMarquee() {
  return (
    <section className="relative py-20 z-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Trusted Partners
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            Clients We <span className="gradient-text">Worked With</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Partnering with leading brands and organizations to deliver world-class security solutions.
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-28 rounded-2xl glass flex items-center justify-center px-6 hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-14 max-w-[150px] object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(96,165,250,0.35)] group-hover:scale-110"
                />
              </motion.div>
              <p className="text-center text-xs text-slate-500 mt-3 group-hover:text-slate-300 transition-colors">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
