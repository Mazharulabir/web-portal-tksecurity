import { motion } from 'framer-motion'

const images = [
  '/images/gallery/gallery1.jpg',
  '/images/gallery/gallery2.jpg',
  '/images/gallery/gallery3.jpg',
  '/images/gallery/gallery4.jpg',
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Gallery</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            Our <span className="gradient-text">Moments</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore some highlights from our work and events.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-2xl group relative"
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <span className="text-white text-sm font-semibold">Image {i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
