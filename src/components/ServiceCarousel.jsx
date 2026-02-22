import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiPhotograph } from 'react-icons/hi'

const services = [
  {
    title: 'Security Guard Services',
    description: 'Our dedicated security guards work 24/7 to protect your property and people with professional, reliable presence at all times.',
    image: '/images/security-guard.png',
  },
  {
    title: 'Marked Vehicle Patrol',
    description: 'Our marked vehicle patrol units provide visible deterrence, rapid response, and comprehensive coverage across your properties.',
    image: '/images/vehicle-patrol.png',
  },
  {
    title: 'Corporate Security',
    description: 'Protecting your workplace, employees, and assets through advanced access control, surveillance, and perimeter security solutions.',
    image: '/images/corporate-security.png',
  },
  {
    title: 'Retail & Venue Security',
    description: 'Ensuring a safe shopping and event environment while protecting against theft and maintaining a welcoming atmosphere for visitors.',
    image: '/images/retail-security.png',
  },
  {
    title: 'Event Security',
    description: 'Crowd control, access management, and emergency protocol implementation for corporate functions, concerts, and private parties.',
    image: '/images/event-security.jpg',
  },
  {
    title: 'Executive Protection',
    description: 'Highly trained, discreet personal security for executives, VIPs, and high-net-worth individuals — at home and while traveling.',
    image: '/images/executive-protection.png',
  },
  {
    title: 'Residential Security',
    description: 'Round-the-clock protection for gated communities, apartment complexes, and private residences with trained, courteous officers.',
    image: '/images/residential-security.png',
  },
]

const GAP = 24 // gap in px (gap-6 = 24px)

export default function ServiceCarousel() {
  const [cardsToShow, setCardsToShow] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const trackRef = useRef(null)
  const containerRef = useRef(null)

  // We clone cards at start and end for infinite loop
  // [clone last N] [real 0..6] [clone first N]
  const cloneCount = cardsToShow
  const extendedServices = [
    ...services.slice(-cloneCount),
    ...services,
    ...services.slice(0, cloneCount),
  ]

  // Real index starts after the clones
  const [index, setIndex] = useState(cloneCount)

  // Responsive cards count
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3)
      else if (window.innerWidth >= 768) setCardsToShow(2)
      else setCardsToShow(1)
    }
    updateCards()
    window.addEventListener('resize', updateCards)
    return () => window.removeEventListener('resize', updateCards)
  }, [])

  // Reset index when cardsToShow changes
  useEffect(() => {
    setIsTransitioning(false)
    setIndex(cardsToShow)
  }, [cardsToShow])

  // Re-enable transition after snap reset
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [isTransitioning])

  // Calculate the translateX value
  const getTranslateX = useCallback(() => {
    if (!containerRef.current) return 0
    const containerWidth = containerRef.current.offsetWidth
    const cardWidth = (containerWidth - GAP * (cardsToShow - 1)) / cardsToShow
    return -(index * (cardWidth + GAP))
  }, [index, cardsToShow])

  const next = useCallback(() => {
    setIsTransitioning(true)
    setIndex((prev) => prev + 1)
  }, [])

  const prev = useCallback(() => {
    setIsTransitioning(true)
    setIndex((prev) => prev - 1)
  }, [])

  // After transition ends, snap to the real position if we're on a clone
  const handleTransitionEnd = useCallback(() => {
    // If we've gone past the real cards on the right
    if (index >= services.length + cloneCount) {
      setIsTransitioning(false)
      setIndex(cloneCount)
    }
    // If we've gone before the real cards on the left
    if (index <= 0) {
      setIsTransitioning(false)
      setIndex(services.length)
    }
  }, [index, cloneCount])

  // Auto-slide
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next, isPaused])

  // Real index for dots (0 to services.length - 1)
  const realIndex = ((index - cloneCount) % services.length + services.length) % services.length

  const goToSlide = (dotIndex) => {
    setIsTransitioning(true)
    setIndex(dotIndex + cloneCount)
  }

  return (
    <section className="relative pt-14 pb-28 z-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-blue-200/20 to-blue-200/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gradient bg-gradient-to-r from-blue-400 via-blue-400 to-blue-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-widest">Our Services</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            What We <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We offer tailored security services, from expert personnel to solutions designed
            for specific industries, ensuring protection for all needs and environments.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrow - Left */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:border-blue-400/40 transition-colors shadow-lg"
          >
            <HiChevronLeft className="text-blue-400 text-xl" />
          </motion.button>

          {/* Arrow - Right */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:border-blue-400/40 transition-colors shadow-lg"
          >
            <HiChevronRight className="text-blue-400 text-xl" />
          </motion.button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-10 sm:mx-14" ref={containerRef}>
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(${getTranslateX()}px)`,
                transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedServices.map((service, i) => {
                const realI = ((i - cloneCount) % services.length + services.length) % services.length
                return (
                  <div
                    key={`card-${i}`}
                    className="group flex-shrink-0"
                    style={{
                      width: containerRef.current
                        ? `${(containerRef.current.offsetWidth - GAP * (cardsToShow - 1)) / cardsToShow}px`
                        : `${100 / cardsToShow}%`,
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="rounded-2xl glass glow hover:border-blue-400/30 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col relative"
                    >
                      {/* Image Area */}
                      <div className="relative w-full h-52 bg-slate-800/80 overflow-hidden">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900">
                            <HiPhotograph className="text-4xl text-blue-400/70" />
                            <span className="text-xs text-slate-500">Add Image</span>
                          </div>
                        )}
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-60" />
                        {/* Service number badge removed */}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed flex-1">
                          {service.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Learn More
                          <HiChevronRight className="text-blue-400 text-base" />
                        </div>
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === realIndex ? 'bg-blue-500 w-8' : 'bg-slate-600 w-2.5 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
