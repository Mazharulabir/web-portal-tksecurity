import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiPlus, HiMinus } from 'react-icons/hi'

const faqs = [
  {
    question: 'Why should I choose TK Security?',
    answer:
      'We are more than a security provider—we are a trusted partner. Our goal is to create safer environments, build strong client relationships, and deliver uncompromising security standards.',
  },
  {
    question: 'What values does TK Security stand for?',
    answer:
      'Our company is built on strong values. Every decision we make is guided by honesty, responsibility, and dedication. We believe real security begins with trust, and we work hard to earn it.',
  },
  {
    question: 'How qualified is your security team?',
    answer:
      'Every security officer goes through strict background screening and professional training. Our team is disciplined, experienced, and prepared to handle any situation with confidence and respect.',
  },
  {
    question: 'What technology do you use for security?',
    answer:
      'We use advanced security tools and monitoring systems to enhance protection. From real-time surveillance to intelligent tracking, our technology helps us stay proactive and one step ahead.',
  },
  {
    question: 'Do you provide 24/7 support?',
    answer:
      'Yes! Your safety matters at every hour. Our team is always on standby, ready to respond quickly to any concern, incident, or emergency—day or night.',
  },
  {
    question: 'How do you tailor solutions for clients?',
    answer:
      'We listen to our client requirements and then select the right solution that fits. We care for your business as our own. We take a sincere interest in it and genuinely want to help your company reach its potential.',
  },
]

function FAQItem({ faq, index, isOpen, toggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        className={`rounded-xl glass overflow-hidden transition-all duration-300 ${
          isOpen ? 'border-blue-500/30' : 'hover:border-blue-400/15'
        }`}
      >
        {/* Question */}
        <button
          onClick={toggle}
          className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <span className="text-blue-400 text-xs font-bold opacity-50">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3
              className={`text-sm sm:text-base font-semibold transition-colors ${
                isOpen ? 'text-blue-300' : 'text-white group-hover:text-blue-300'
              }`}
            >
              {faq.question}
            </h3>
          </div>
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? 'bg-blue-600 rotate-0'
                : 'bg-slate-800 group-hover:bg-slate-700'
            }`}
          >
            {isOpen ? (
              <HiMinus className="text-white text-sm" />
            ) : (
              <HiPlus className="text-slate-400 text-sm" />
            )}
          </div>
        </button>

        {/* Answer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pl-14">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function WhyChooseUsHome() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative py-24 z-10 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-5">
            Why <span className="gradient-text">Choose Us</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Find answers to common questions about our security services and what sets us apart.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Section divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        />
      </div>
    </section>
  )
}
