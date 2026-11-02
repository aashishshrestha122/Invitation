import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 11) % 100}%`,
  size: 8 + ((i * 7) % 18),
  duration: 8 + (i % 6),
  delay: (i % 5) * 0.3,
}))

const COUNTDOWN_TARGET = new Date('2026-12-03T00:00:00')

function getCountdownParts(targetDate) {
  const now = new Date()
  const diffMs = Math.max(0, targetDate.getTime() - now.getTime())

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

export default function EnvelopeScene({ galleryImages }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(COUNTDOWN_TARGET))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const bgCards = [
    { className: 'col-span-2 row-span-1 translate-y-0 rotate-[-10deg] sm:col-span-1 sm:row-span-2', float: [0, -16, 0], drift: [0, 18, 0], scale: [1, 1.05, 1] },
    { className: 'col-span-1 row-span-1 translate-y-4 rotate-[8deg] sm:col-span-1 sm:row-span-1', float: [0, 12, 0], drift: [0, -14, 0], scale: [1, 1.04, 1] },
    { className: 'col-span-1 row-span-1 translate-y-2 rotate-[3deg] sm:col-span-1 sm:row-span-1', float: [0, -10, 0], drift: [0, 12, 0], scale: [1, 1.035, 1] },
    { className: 'col-span-1 row-span-1 translate-y-6 rotate-[-6deg] sm:col-span-1 sm:row-span-2', float: [0, 14, 0], drift: [0, -18, 0], scale: [1, 1.05, 1] },
    { className: 'col-span-1 row-span-1 translate-y-1 rotate-[6deg] sm:col-span-1 sm:row-span-1', float: [0, -12, 0], drift: [0, 14, 0], scale: [1, 1.04, 1] },
    { className: 'col-span-2 row-span-1 translate-y-5 rotate-[-4deg] sm:col-span-1 sm:row-span-1', float: [0, 10, 0], drift: [0, -12, 0], scale: [1, 1.04, 1] },
  ]

  return (
    <section className={`aurora-bg wedding-stage ${isOpen ? 'wedding-open' : ''} relative h-full overflow-hidden px-2 py-3 sm:px-6 sm:py-8`}>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,14,20,0.08),rgba(15,14,20,0.8))]" />
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-2 p-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-5 sm:p-8">
          {galleryImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={image.src ?? image}
              className={`wedding-memory relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0e14] shadow-[0_24px_42px_rgba(0,0,0,0.45)] ${bgCards[index].className}`}
              animate={{
                y: bgCards[index].float,
                x: bgCards[index].drift,
                scale: bgCards[index].scale,
                rotate: [0, index % 2 === 0 ? 2 : -2, 0],
              }}
              transition={{
                duration: 14 + index * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            >
              <img
                src={image.src ?? image}
                alt={image.alt ?? 'Background memory'}
                className="h-full w-full object-cover blur-[1.5px] saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1520]/18 via-transparent to-[#0f0e14]/50" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f0e14]/88 to-transparent px-3 py-2">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#f0d7e7]">{image.caption ?? 'Memory'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="floating-glow left-[-10rem] top-[20%] h-80 w-80 bg-[#6f2f4c]" />
      <div className="floating-glow right-[-8rem] top-[46%] h-72 w-72 bg-[#8f6330]" />
      <div className="floating-glow bottom-[6%] left-[20%] h-64 w-64 bg-[#2a2330]" />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#f2d7ae] blur-[1px]"
            style={{ left: particle.left, width: particle.size, height: particle.size }}
            animate={{ y: [0, -32, 0], opacity: [0.1, 0.85, 0.2] }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          className="wedding-envelope-frame relative mx-auto mt-12 h-[84svh] max-h-[720px] min-h-[460px] w-[min(96vw,760px)] sm:mt-14 sm:h-[78vh] sm:min-h-[520px] sm:w-[min(94vw,760px)]"
        >
          <div className="pointer-events-none absolute -inset-2 rounded-[30px] border border-[#8f6330]/50" />
          <div className="pointer-events-none absolute -inset-4 rounded-[36px] border border-[#d3ad73]/28" />
          <div className="pointer-events-none absolute inset-[8%] rounded-[28px] border border-white/6 bg-black/10 blur-[2px]" />

          <motion.div
            id="wedding-invitation-letter"
            className="wedding-letter absolute bottom-[8%] left-3 right-3 top-[16%] z-[4] overflow-hidden rounded-xl border border-[#7f5a36] bg-[linear-gradient(145deg,#211a23,#1a1520)] px-3 py-4 shadow-[0_22px_30px_rgba(8,7,12,0.45)] sm:left-4 sm:right-4 sm:px-4 sm:py-5 md:left-12 md:right-12 md:px-5 md:py-6"
            aria-hidden={!isOpen}
            initial={false}
            animate={{ y: isOpen ? '0%' : '12%', scale: isOpen ? 1 : 0.96, opacity: isOpen ? 1 : 0 }}
            transition={{
              y: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: isOpen ? 0.5 : 0.28, delay: isOpen ? 0.16 : 0.08, ease: 'easeInOut' },
            }}
            style={{ zIndex: isOpen ? 8 : 4, pointerEvents: isOpen ? 'auto' : 'none' }}
          >
            <div className="wedding-letter-scroll h-full overflow-y-auto pr-1 text-left [scrollbar-width:thin]">
              <p className="section-tag wedding-kicker">शुभ विवाह · Wedding Invitation</p>
              <h2 className="wedding-title mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl md:text-4xl">Aashish <span>&amp;</span> Subbechya</h2>
              <p className="wedding-date mt-1 text-sm text-[#cbb4c5] md:text-base">Thursday, 3 December 2026 · Lalitpur, Nepal</p>

              <article className="glass-card wedding-card mt-4 rounded-2xl p-4 md:p-5">
                <p className="section-tag wedding-kicker">The sacred celebration</p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">Together, as one</h3>
                <ul className="wedding-copy mt-2 space-y-1 text-sm text-[#cdb7c7]">
                  <li>Time: 5:30 PM</li>
                  <li>Venue: Ashok Party Palace</li>
                  <li>Attire: Traditional festive wear</li>
                </ul>
              </article>

              <article className="glass-card wedding-card mt-3 rounded-2xl p-4 md:p-5">
                <p className="section-tag wedding-kicker">Our story</p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">From chiya to forever</h3>
                <p className="wedding-copy mt-2 text-sm leading-relaxed text-[#cdb7c7]">
                  With the blessings of our families, we invite you to celebrate a love rooted in friendship, devotion, and the promise of a lifetime.
                </p>
              </article>

              <article className="glass-card wedding-card mt-3 rounded-2xl p-4 md:p-5">
                <p className="section-tag wedding-kicker">The auspicious day</p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">Until we say “I do”</h3>
                <p className="wedding-copy mt-2 text-sm text-[#cdb7c7]">Counting down to 3 December 2026</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  <div className="wedding-count rounded-lg border border-[#7f5d40] bg-[#29212f] p-2 text-center">
                    <p className="font-display text-xl text-[#f1d6e6] sm:text-2xl">{countdown.days}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c7a790]">Days</p>
                  </div>
                  <div className="wedding-count rounded-lg border border-[#7f5d40] bg-[#29212f] p-2 text-center">
                    <p className="font-display text-xl text-[#f1d6e6] sm:text-2xl">{String(countdown.hours).padStart(2, '0')}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c7a790]">Hours</p>
                  </div>
                  <div className="wedding-count rounded-lg border border-[#7f5d40] bg-[#29212f] p-2 text-center">
                    <p className="font-display text-xl text-[#f1d6e6] sm:text-2xl">{String(countdown.minutes).padStart(2, '0')}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c7a790]">Mins</p>
                  </div>
                  <div className="wedding-count rounded-lg border border-[#7f5d40] bg-[#29212f] p-2 text-center">
                    <p className="font-display text-xl text-[#f1d6e6] sm:text-2xl">{String(countdown.seconds).padStart(2, '0')}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c7a790]">Secs</p>
                  </div>
                </div>
              </article>

            </div>
          </motion.div>

          <div className="wedding-envelope relative h-full w-full overflow-hidden rounded-[30px] border border-[#5d3f2b] bg-gradient-to-br from-[#6b4a32] via-[#4f3528] to-[#3a2824] shadow-[0_24px_36px_rgba(8,7,12,0.5)]">
            <motion.div
              className="wedding-flap absolute inset-x-0 top-0 z-[6] h-[40%] origin-top rounded-t-[30px] border-y border-[#6b4a32] bg-gradient-to-b from-[#886243] to-[#4b3328] shadow-[0_8px_18px_rgba(8,7,12,0.35)]"
              animate={{ rotateX: isOpen ? -176 : 0 }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="wedding-front pointer-events-none absolute inset-0 z-[5] clip-envelope-front rounded-[30px] border border-[#6b4a32] bg-gradient-to-br from-[#7b5638] via-[#5f412d] to-[#422f26]"
              animate={{ opacity: isOpen ? 0.72 : 1 }}
              transition={{ duration: 0.58, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute inset-0 z-[5] clip-envelope-front bg-[linear-gradient(180deg,rgba(236,209,174,0.16),rgba(255,255,255,0.02))]" />
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[66%] w-1/2 border-r border-[#7a5639]/55"
              style={{ clipPath: 'polygon(0 0, 100% 55%, 100% 100%, 0 100%)' }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[66%] w-1/2 border-l border-[#7a5639]/55"
              style={{ clipPath: 'polygon(0 55%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div className="pointer-events-none absolute bottom-[16%] left-1/2 z-[5] h-[24%] w-px -translate-x-1/2 bg-[#7a5639]/55" />
            <button
              type="button"
              className="wedding-seal absolute left-1/2 top-1/2 z-[10] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#a97993] bg-gradient-to-br from-[#7f3551] to-[#3e1b2b] shadow-xl"
              aria-label={isOpen ? 'Close the wedding invitation' : 'Open the wedding invitation'}
              aria-controls="wedding-invitation-letter"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <motion.span
                key={isOpen ? 'close' : 'monogram'}
                className="font-display text-xl text-[#f4d2a0]"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                {isOpen ? '×' : 'AS'}
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
