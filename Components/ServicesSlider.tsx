"use client"
import React, { useState, useRef, useEffect } from 'react'

const services = [
  {
    title: 'Pediatric Eye Care',
    desc: 'Myopia control, lazy eye treatment, and strabismus correction for children.',
    img: '/images/service-1.svg'
  },
  {
    title: 'Cataract Surgery',
    desc: 'Advanced cataract removal with premium lens options.',
    img: '/images/service-2.svg'
  },
  {
    title: 'Vision Correction',
    desc: 'LASIK and PRK procedures with personalised care plans.',
    img: '/images/service-3.svg'
  }
]

export default function ServicesSlider() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % services.length), 6000)
    return () => clearInterval(id)
  }, [])

  const goPrev = () => setIndex(i => (i - 1 + services.length) % services.length)
  const goNext = () => setIndex(i => (i + 1) % services.length)

  return (
    <section className="my-12">
      <div className="max-w-9xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-[0.32em]">Our Services</p>
            <h2 className="text-3xl font-black">Services Tailored to You</h2>
            <p className="text-slate-500 mt-2">Providing professional eye examinations, advanced vision care, precise diagnostics, and personalized eyewear solutions.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={goPrev} aria-label="Previous" className="w-10 h-10 rounded-full bg-emerald-300 text-white flex items-center justify-center">‹</button>
            <button onClick={goNext} aria-label="Next" className="w-10 h-10 rounded-full bg-emerald-300 text-white flex items-center justify-center">›</button>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const isActive = i === index
            const isHovered = hovered === i
            const defaultOverlay = 'rgba(0,0,0,0.45)'
            const logoOverlay = 'rgba(79,70,229,0.18)' // indigo-600 at low opacity
            const overlayColor = isHovered ? logoOverlay : defaultOverlay

            return (
              <div
                key={s.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative overflow-hidden rounded-2xl h-80 transition-all duration-500 cursor-pointer ${isActive ? 'shadow-xl scale-100' : 'opacity-70 scale-95'}`}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="absolute inset-0 transition-colors duration-500" style={{ background: overlayColor }} />
                <div className="relative p-6 h-full flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm max-w-prose">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
