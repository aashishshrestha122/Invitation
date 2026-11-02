'use client'

import { useRef, useState } from 'react'

export default function MusicToggle() {
  const [isOn, setIsOn] = useState(false)
  const contextRef = useRef(null)
  const gainRef = useRef(null)
  const oscRefs = useRef([])

  const startAmbient = async () => {
    if (!contextRef.current) {
      const ctx = new window.AudioContext()
      const gain = ctx.createGain()
      gain.gain.value = 0.02
      gain.connect(ctx.destination)

      const freqs = [220, 277.18, 329.63]
      oscRefs.current = freqs.map((freq) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.connect(gain)
        osc.start()
        return osc
      })

      contextRef.current = ctx
      gainRef.current = gain
    }

    if (contextRef.current.state === 'suspended') {
      await contextRef.current.resume()
    }

    setIsOn(true)
  }

  const stopAmbient = async () => {
    if (contextRef.current && contextRef.current.state === 'running') {
      await contextRef.current.suspend()
    }
    setIsOn(false)
  }

  const handleToggle = () => {
    if (isOn) {
      stopAmbient()
      return
    }
    startAmbient()
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-[#d8b89a] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#6e3a33] shadow-sm backdrop-blur"
      aria-pressed={isOn}
    >
      {isOn ? 'Music On' : 'Music Off'}
    </button>
  )
}
