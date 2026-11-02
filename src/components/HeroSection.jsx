import { motion } from 'framer-motion'
import MusicToggle from './MusicToggle'

export default function HeroSection({ heroOpacity, heroY }) {
  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative overflow-hidden border-t border-[#edd7c2] bg-[linear-gradient(140deg,#fffaf4,#ffeedd)] px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(255,255,255,0.75),transparent_38%),radial-gradient(circle_at_82%_74%,rgba(246,160,146,0.2),transparent_44%)]" />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-6 flex justify-center">
          <MusicToggle />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a4a38]">Romantic Evening Celebration</p>
        <h2 className="mt-3 font-display text-4xl text-[#5f2b27] md:text-6xl">Aashish & Subbechya</h2>
        <p className="mt-4 text-base text-[#7d5750] md:text-lg">Saturday, 26 June 2027 · 5:30 PM · Ashok Party Palace, Kathmandu</p>
      </div>
    </motion.section>
  )
}
