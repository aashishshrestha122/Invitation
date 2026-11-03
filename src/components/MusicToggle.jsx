'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SPOTIFY_IFRAME_API =
  'https://open.spotify.com/embed/iframe-api/v1'
const TRACK_URI = 'spotify:track:1bhUWB0zJMIKr9yVPrkEuI'
const hearts = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: ((index * 47 + 9) % 96) / 100,
  delay: (index % 7) * 0.035,
  size: 20 + (index % 4) * 8,
  sway: index % 2 === 0 ? 1 : -1,
}))

let spotifyApiPromise

function loadSpotifyIframeApi() {
  if (!spotifyApiPromise) {
    spotifyApiPromise = new Promise((resolve, reject) => {
      window.onSpotifyIframeApiReady = resolve

      const script = document.createElement('script')
      script.src = SPOTIFY_IFRAME_API
      script.async = true
      script.onerror = () => reject(new Error('Spotify player failed to load'))
      document.body.appendChild(script)
    })
  }

  return spotifyApiPromise
}

export default function MusicToggle({ isOpen }) {
  const playerRef = useRef(null)
  const [heartPhase, setHeartPhase] = useState('hidden')
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [playerError, setPlayerError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    let disposed = false
    let controller
    const playerElement = playerRef.current

    loadSpotifyIframeApi()
      .then((iframeApi) => {
        if (disposed || !playerElement) return

        iframeApi.createController(
          playerElement,
          { uri: TRACK_URI, width: '100%', height: 80 },
          (embedController) => {
            if (disposed) {
              embedController.destroy()
              return
            }

            controller = embedController
            controller.addListener('playback_started', () => {
              setViewport({ width: window.innerWidth, height: window.innerHeight })
              setHeartPhase('playing')
            })
            controller.addListener('playback_update', (event) => {
              if (event.data.isPaused) {
                setHeartPhase((phase) =>
                  phase === 'playing' ? 'exiting' : phase,
                )
              } else {
                setViewport({ width: window.innerWidth, height: window.innerHeight })
                setHeartPhase('playing')
              }
            })
          },
        )
      })
      .catch(() => {
        if (!disposed) setPlayerError(true)
      })

    return () => {
      disposed = true
      controller?.destroy()
    }
  }, [])

  useEffect(() => {
    if (heartPhase !== 'exiting') return undefined

    const timeout = window.setTimeout(() => setHeartPhase('hidden'), 1400)
    return () => window.clearTimeout(timeout)
  }, [heartPhase])

  return (
    <>
      {heartPhase !== 'hidden' && (
        <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="fixed left-0 top-0 block drop-shadow-[0_2px_8px_rgba(80,0,20,0.35)]"
              style={{ fontSize: heart.size }}
              initial={{
                x: heart.left * viewport.width,
                y: viewport.height + heart.size,
                opacity: 0,
                scale: 0.5,
              }}
              animate={
                heartPhase === 'exiting'
                  ? { y: -heart.size - 40, opacity: 0, scale: 0.6 }
                  : {
                      x: [
                        heart.left * viewport.width,
                        heart.left * viewport.width + heart.sway * 18,
                        heart.left * viewport.width - heart.sway * 12,
                      ],
                      y: [viewport.height + heart.size, -heart.size - 40],
                      opacity: [0, 1, 1, 0],
                      scale: [0.65, 1, 0.9],
                    }
              }
              transition={{
                duration:
                  heartPhase === 'exiting'
                    ? prefersReducedMotion
                      ? 0.2
                      : 1.2
                    : prefersReducedMotion
                      ? 0.01
                      : 5 + (heart.id % 4) * 0.6,
                delay: heart.delay,
                ease: heartPhase === 'exiting' ? 'easeIn' : 'easeOut',
                repeat: heartPhase === 'playing' && !prefersReducedMotion
                  ? Infinity
                  : 0,
              }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
      )}
      <motion.div
        layout="position"
        transition={{ layout: { type: 'spring', stiffness: 220, damping: 28 } }}
        className={`z-[70] w-[min(300px,calc(100vw-2.5rem))] sm:w-[min(360px,calc(100vw-2rem))] transition-[width,transform,opacity] duration-500 ease-out will-change-transform ${
          isOpen
            ? 'wedding-music-player-open fixed inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] mx-auto'
            : 'relative z-30 mt-3'
        }`}
      >
        {playerError && (
          <p role="status" className="text-center text-sm text-white">
            Music player could not load. Please try refreshing the page.
          </p>
        )}
        <div
          ref={playerRef}
          className="h-20 w-full overflow-hidden rounded-2xl border border-white/30 bg-[#211923]/90 shadow-[0_12px_32px_rgba(25,12,20,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_38px_rgba(25,12,20,0.45)]"
        />
      </motion.div>
    </>
  )
}
