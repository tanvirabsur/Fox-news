"use client"
import React, { useEffect, useRef, useState } from 'react'

const items = [
  {
    title: 'Investigative Features',
    text: 'In-depth reporting with data-backed narratives and exclusive interviews.',
    accent: 'from-indigo-500 to-indigo-300'
  },
  {
    title: 'Interactive Data',
    text: 'Visual stories that let readers explore datasets and maps directly.',
    accent: 'from-emerald-400 to-teal-300'
  },
  {
    title: 'Audio Briefs',
    text: 'Short, expertly produced audio summaries for on-the-go listening.',
    accent: 'from-rose-400 to-rose-200'
  }
]

export default function HomeHighlights() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="my-16">
      <div className="site-container site-container--wide px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-widest">Highlights</p>
            <h2 className="text-3xl font-extrabold mt-2">What Makes Us Different</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <article
              key={it.title}
              className={`relative overflow-hidden rounded-2xl p-6 h-56 flex flex-col justify-end bg-white/5 backdrop-blur-sm transition-all duration-700 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-br ${it.accent} opacity-10 blur-xl pointer-events-none`} />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-prose">{it.text}</p>
              </div>
              <div className="absolute top-6 right-6 z-10 opacity-10 text-6xl font-extrabold text-slate-900 select-none">{idx+1}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
