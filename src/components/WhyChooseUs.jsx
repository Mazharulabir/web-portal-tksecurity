import { motion } from 'framer-motion'
import { HiHeart, HiUsers, HiLightningBolt, HiClock } from 'react-icons/hi'

const reasons = [
  {
    icon: HiHeart,
    title: 'Honesty, Reliability & Commitment',
    description: 'Our company is built on strong values. Every decision we make is guided by honesty, responsibility, and dedication. We believe real security begins with trust, and we work hard to earn it.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: HiUsers,
    title: 'Skilled & Professional Team',
    description: 'Every security officer goes through strict background screening and professional training. Our team is disciplined, experienced, and prepared to handle any situation with confidence and respect.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: HiLightningBolt,
    title: 'Smart & Modern Security Solutions',
    description: 'We use advanced security tools and monitoring systems to enhance protection. From real-time surveillance to intelligent tracking, our technology helps us stay proactive and one step ahead.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: HiClock,
    title: '24/7 Reliable Support',
    description: 'Your safety matters at every hour. Our team is always on standby, ready to respond quickly to any concern, incident, or emergency — day or night.',
    color: 'from-emerald-500 to-teal-600',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            Why Choose <span className="gradient-text">TK Security?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We are more than a security provider — we are a trusted partner. Our goal is to
            create safer environments, build strong client relationships, and deliver
            uncompromising security standards.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex gap-5 p-8 rounded-2xl glass hover:border-blue-400/30 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <reason.icon className="text-blue-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-slate-400 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            With us you'll feel heard. We listen to our client requirements and then select
            the right solution that fits. We care for your business as our own. We take a
            sincere interest in it and genuinely want to help your company reach its potential.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
