'use client'

import { useState } from 'react'

const YOUTUBE_EMBED_URL =
  'https://www.youtube-nocookie.com/embed/817P8W8-mGE?autoplay=1&rel=0'

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[70] flex flex-col items-end gap-2">
      {isPlaying && (
        <div className="overflow-hidden rounded-xl border border-[#f1d6e6]/30 bg-[#211923]/95 p-1.5 shadow-2xl backdrop-blur">
          <iframe
            className="h-[200px] w-[min(320px,calc(100vw-2rem))] rounded-lg"
            src={YOUTUBE_EMBED_URL}
            title="Ed Sheeran - Perfect (Official Music Video)"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsPlaying((playing) => !playing)}
        className="rounded-full border border-[#f1d6e6]/50 bg-[#3e1b2b]/90 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#fff4d2] shadow-lg backdrop-blur transition hover:bg-[#6f2f4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff0c8]"
        aria-expanded={isPlaying}
      >
        {isPlaying ? 'Stop music' : 'Play Perfect'}
      </button>
    </div>
  )
}
