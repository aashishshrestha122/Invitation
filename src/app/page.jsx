'use client'

import EnvelopeScene from '@/components/EnvelopeScene'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#0f0e14]">
      <EnvelopeScene backgroundImage={`${basePath}/photos/event-background-image.jpeg`} />
    </main>
  )
}
