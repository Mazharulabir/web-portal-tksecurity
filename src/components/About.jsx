import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiShieldCheck } from 'react-icons/hi'

const highlights = [
  'Trained armed and unarmed security officers',
  'Proactive monitoring and fast response',
  'Disciplined, respectful security presence',
  'Tailored solutions for every environment',
]

function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass p-1">
              <div className="rounded-xl bg-slate-800/80 p-8">
                {/* Shield visual */}
                <div className="flex items-center gap-3 mb-6">
                  <HiShieldCheck className="text-blue-400 text-3xl" />
                  <div>
                    <div className="text-white font-bold text-lg">TK Security Inc.</div>
                    <div className="text-xs text-slate-400">Southern California</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/60 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      <CountUp end={24} suffix="/7" />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Active Protection</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      <CountUp end={40} suffix="+" />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Regions Covered</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      <CountUp end={500} suffix="+" />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Clients Secured</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      <CountUp end={99} suffix="%" />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Client Satisfaction</div>
                  </div>
                </div>

                {/* Status bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Response Time', value: 95 },
                    { label: 'Client Retention', value: 98 },
                    { label: 'Coverage Area', value: 88 },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Background glow */}
            <div className="absolute -inset-4 bg-blue-500/8 rounded-3xl blur-3xl -z-10" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">About Us</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-6">
              Safety Is Our <span className="gradient-text">Responsibility</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-4">
              At TK Security, safety is our responsibility. Built on trust and professionalism,
              we deliver reliable security solutions to protect people, property, and peace of
              mind — tailored for homes, businesses, events, and specialized facilities.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              We are more than a security provider — we are a trusted partner. Our goal is to
              create safer environments, build strong client relationships, and deliver
              uncompromising security standards.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <HiCheckCircle className="text-blue-400 text-xl flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
