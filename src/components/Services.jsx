import { motion } from 'framer-motion'
import { HiShieldCheck, HiTruck, HiOfficeBuilding, HiShoppingCart, HiUserGroup, HiStar } from 'react-icons/hi'

const services = [
  {
    icon: HiShieldCheck,
    title: 'Security Guard',
    description: 'Our dedicated security guards work 24/7 to protect your property and people with professional, reliable presence at all times.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: HiTruck,
    title: 'Marked Vehicle Patrol',
    description: 'Our marked vehicle patrol units provide visible deterrence, rapid response, and comprehensive coverage across your properties.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: HiOfficeBuilding,
    title: 'Corporate Security',
    description: 'Our corporate security services protect your workplace, employees, and assets through advanced access control and perimeter security.',
    color: 'from-slate-500 to-slate-700',
  },
  {
    icon: HiShoppingCart,
    title: 'Retail Venues',
    description: 'Our retail security services ensure a safe shopping environment while protecting against theft and maintaining a welcoming atmosphere.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: HiUserGroup,
    title: 'Event Security',
    description: 'Crowd control, access management, and emergency protocol implementation for corporate functions, concerts, and private parties.',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: HiStar,
    title: 'Executive Protection',
    description: 'Highly trained, discreet personal security for executives, VIPs, and high-net-worth individuals, at home and while traveling.',
    color: 'from-purple-500 to-purple-700',
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-8 rounded-2xl glass glow hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <service.icon className="text-blue-400 text-2xl" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-slate-400 leading-relaxed">{service.description}</p>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We offer tailored security services, from expert personnel to solutions designed
            for specific industries, ensuring protection for all needs and environments.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
