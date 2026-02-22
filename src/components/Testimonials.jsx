import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'


const testimonials = [
  {
    name: 'Michael Rodriguez',
    handle: '@Rodriguez',
    avatar: 'MR',
    content: 'Reliable, disciplined, and trustworthy security support — worth every penny.',
    rating: 4.9,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'David Thompson',
    handle: '@David',
    avatar: 'DT',
    content: 'Highly dependable and professional security team, I always feel confident with their service.',
    rating: 4.8,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Sarah Mitchell',
    handle: '@Sarah',
    avatar: 'SM',
    content: 'Excellent response time and well-trained guards, truly impressed.',
    rating: 5.0,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Priya Banerjee',
    handle: '@priyabanerjee',
    avatar: 'PB',
    content: 'Very professional and always on time. Their presence makes our staff feel safe.',
    rating: 4.7,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'John Lee',
    handle: '@johnlee',
    avatar: 'JL',
    content: 'The guards are courteous and attentive. We appreciate their dedication to our business.',
    rating: 4.6,
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Fatima Mohamed',
    handle: '@fatimam',
    avatar: 'FM',
    content: 'Quick response in emergencies and always available for support. Highly recommended!',
    rating: 4.9,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Carlos Alvarez',
    handle: '@carlosalvarez',
    avatar: 'CA',
    content: 'We have used their services for multiple events. Always reliable and friendly.',
    rating: 4.8,
    color: 'from-blue-500 to-blue-700',
  },
]

export default function Testimonials() {

  return (
    <section id="testimonials" className="relative py-32 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Client Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 mb-4">
            Hear From Our <span className="gradient-text">Satisfied Clients</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl glass glow border-blue-400/30 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col relative min-w-[260px] max-w-sm mx-auto p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg`}>{t.avatar}</div>
                <span className="font-bold text-lg text-slate-200">{t.name}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full shadow text-green-600 font-semibold text-sm w-fit mb-2">
                {t.rating.toFixed(1)} <HiStar className="inline text-green-500 text-base ml-1" />
              </div>
              <p className="text-slate-300 text-base mb-6 mt-2 flex-1">"{t.content}"</p>
              <div className="text-slate-400 text-xs font-mono">{t.handle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

          {/* ...existing code... */}

