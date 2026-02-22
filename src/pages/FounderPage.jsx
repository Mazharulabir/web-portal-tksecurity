import { motion } from 'framer-motion'
import { HiShieldCheck, HiStar, HiUserGroup, HiLightBulb, HiHeart, HiAcademicCap } from 'react-icons/hi'

const milestones = [
  { year: 'Foundation', text: 'Founded TK Security Inc. with a mission to deliver honest, reliable protection services.' },
  { year: 'Growth', text: 'Expanded operations across Southern California, building a team of 500+ trained professionals.' },
  { year: 'Innovation', text: 'Integrated modern surveillance and smart security technologies into service offerings.' },
  { year: 'Today', text: 'Established as a trusted name in safety, serving residential, commercial, and industrial clients.' },
]

const values = [
  { icon: HiHeart, title: 'Integrity First', desc: 'Every decision guided by honesty, transparency, and accountability.' },
  { icon: HiUserGroup, title: 'People-Centric', desc: 'Building lasting relationships with clients, employees, and communities.' },
  { icon: HiLightBulb, title: 'Visionary Thinking', desc: 'Embracing innovation and modern solutions to stay ahead in security.' },
  { icon: HiAcademicCap, title: 'Excellence', desc: 'Committed to the highest standards of training, service, and professionalism.' },
]

export default function FounderPage() {
  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="pt-24" />

      {/* Founder Hero */}
      <section className="relative py-24 z-10 overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-12 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex justify-center mb-6 mx-auto">
                <img 
                  src="/images/CEO.jpeg" 
                  alt="CEO"
                  className="w-80 h-80 rounded-full object-cover border-4 border-blue-500 shadow-xl shadow-blue-600/20 bg-slate-900"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Founder & CEO</h3>
              <p className="text-blue-400 font-medium mb-4">TK Security Inc.</p>
              {/* Signature quote */}
              <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-700/50">
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "Real security begins with trust. Our commitment is to protect people,
                  property, and peace of mind — with honesty and professionalism."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Leadership</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-6">
                Meet Our <span className="gradient-text">Founder & CEO</span>
              </h2>
              <div className="bg-slate-900/60 rounded-xl p-6 mb-6">
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Welcome to TK Security — where your safety is our highest priority.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  In an age where risks are constantly evolving, ensuring the security of people, assets, and information is no longer a luxury — it’s a necessity. When I founded TK Security, my vision was simple yet powerful: to build a security services company that stands for trust, professionalism, and unwavering commitment to excellence.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Every individual and organization deserves peace of mind — the confidence that their environment is protected by capable hands. Over the years, we’ve worked with diverse clients across industries, tailoring our solutions to meet the unique needs of each partner. What sets us apart is not just our trained personnel and advanced technology, but our core values: integrity, responsibility, and proactive service.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  To our clients, I extend my heartfelt appreciation. Your trust has made TK Security what it is today. We don’t just provide security solutions — we build long-term relationships grounded in reliability and mutual respect.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Looking forward, our mission remains clear: How we are different than others security services in the region. With continuous improvement, innovation, and a dedicated team that never settles for “good enough,” we are committed to safeguarding your world — every minute, every day at low cost.
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Thank you for choosing TK Security.<br/>
                  Your safety is our promise.
                </p>
                <div className="mt-6">
                  <span className="block text-slate-400 font-semibold">Warm regards,</span>
                  <span className="block h-6" />
                  <span className="block text-white font-bold">T.K Blouch</span>
                  <span className="block text-blue-400 font-medium">Founder & CEO, TK Security</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Visionary Leader', 'Industry Expert', 'Community Builder', 'Innovator'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium border border-blue-600/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Leadership Values</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
              Principles That <span className="gradient-text">Guide Us</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our founder's core values are embedded in every aspect of TK Security's operations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass hover:border-blue-400/30 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="text-blue-400 text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
              Building a <span className="gradient-text">Legacy of Trust</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500/50 to-transparent" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-6 items-start"
                >
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20 z-10">
                    <HiStar className="text-white text-lg" />
                  </div>
                  <div className="glass rounded-xl p-6 flex-1">
                    <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">{m.year}</span>
                    <p className="text-slate-300 mt-2 leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Quote */}
      <section className="relative py-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_60%)]" />

            <div className="relative p-12 sm:p-16 text-center">
              <HiShieldCheck className="text-blue-400 text-5xl mx-auto mb-6" />
              <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-6">
                "Our vision is to set the gold standard in security — through integrity,
                innovation, and an unbreakable commitment to the communities we serve."
              </blockquote>
              <p className="text-blue-400 font-semibold">— Founder & CEO, TK Security Inc.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
