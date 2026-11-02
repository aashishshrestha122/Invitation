'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

function getCountdown(targetDate) {
  const target = new Date(targetDate).getTime()
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function Tile({ label, value }) {
  return (
    <motion.div
      layout
      className="rounded-2xl border border-[#e8d1bd] bg-white/80 px-4 py-6 shadow-[0_10px_24px_rgba(76,44,30,0.08)]"
    >
      <p className="font-display text-4xl text-[#5f2b27] md:text-5xl">{String(value).padStart(2, '0')}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8f6557]">{label}</p>
    </motion.div>
  )
}

export default function CountdownSection({ targetDate }) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const tiles = useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )

  return (
    <section className="border-t border-[#edd7c2] bg-[#fffdf9] px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">Countdown</p>
      <h3 className="mt-3 font-display text-4xl text-[#5f2b27] md:text-5xl">Until We Say I Do</h3>
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        {tiles.map((tile) => (
          <Tile key={tile.label} {...tile} />
        ))}
      </div>
    </section>
  )
}
