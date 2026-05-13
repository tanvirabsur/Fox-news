"use client"
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  gender?: 'female' | 'male' | 'any'
}

export default function ListenControls({ text, gender = 'female' }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const synth = (window as any).speechSynthesis as SpeechSynthesis
    const load = () => setVoices(synth.getVoices() || [])
    load()
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = load
    return () => {
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = null
    }
  }, [])

  const chooseVoice = () => {
    if (!voices || voices.length === 0) return undefined
    const langPref = /en[-_]?us/i
    const genderPref = gender === 'female' ? /(female|woman|zira|samantha|alloy)/i : /(male|man|david|mark|matt)/i

    // try match lang + gender
    let v = voices.find(v => langPref.test(v.lang) && genderPref.test(v.name))
    if (v) return v
    // try gender only
    v = voices.find(v => genderPref.test(v.name))
    if (v) return v
    // try lang only
    v = voices.find(v => langPref.test(v.lang))
    if (v) return v
    return voices[0]
  }

  const speak = () => {
    const synth = (window as any).speechSynthesis as SpeechSynthesis
    if (!synth) return

    if (isSpeaking) {
      synth.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
      utterRef.current = null
      return
    }

    const u = new SpeechSynthesisUtterance(text)
    const v = chooseVoice()
    if (v) u.voice = v
    u.rate = 1
    u.pitch = 1

    u.onstart = () => { setIsSpeaking(true); setIsPaused(false) }
    u.onend = () => { setIsSpeaking(false); setIsPaused(false); utterRef.current = null }
    u.onpause = () => setIsPaused(true)
    u.onresume = () => setIsPaused(false)

    utterRef.current = u
    synth.cancel()
    synth.speak(u)
  }

  const togglePause = () => {
    const synth = (window as any).speechSynthesis as SpeechSynthesis
    if (!synth || !isSpeaking) return
    if (isPaused) { synth.resume(); setIsPaused(false) }
    else { synth.pause(); setIsPaused(true) }
  }

  const stop = () => {
    const synth = (window as any).speechSynthesis as SpeechSynthesis
    if (!synth) return
    synth.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
    utterRef.current = null
  }

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={speak}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md transition-transform active:scale-95 ${isSpeaking ? 'bg-rose-500 text-white' : 'bg-gradient-to-r from-indigo-600 to-indigo-400 text-white'}`}
        aria-pressed={isSpeaking}
      >
        {isSpeaking ? '⏹ Stop' : '🔊 Listen'}
      </button>

      <button
        onClick={togglePause}
        disabled={!isSpeaking}
        className={`px-3 py-2 rounded-md text-sm ${isSpeaking ? 'bg-white/90 text-slate-900 shadow-sm' : 'bg-slate-200 text-slate-400'}`}
      >
        {isPaused ? '▶ Resume' : '⏸ Pause'}
      </button>

      <button
        onClick={stop}
        disabled={!isSpeaking}
        className="px-3 py-2 rounded-md text-sm bg-slate-100 text-slate-700"
      >
        ⏹ Stop
      </button>
    </div>
  )
}
