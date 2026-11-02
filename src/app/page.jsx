'use client'

import EnvelopeScene from '@/components/EnvelopeScene'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const galleryImages = [
  {
    src: `${basePath}/photos/IMG_9200.jpg`,
    alt: 'Couple train memory',
    caption: 'A quiet journey together',
  },
  {
    src: `${basePath}/photos/IMG_0346.jpg`,
    alt: 'Couple closeup smile',
    caption: 'Sunlight and smiles',
  },
  {
    src: `${basePath}/photos/IMG_6264.JPG`,
    alt: 'A wedding celebration',
    caption: 'A day to remember',
  },
  {
    src: `${basePath}/photos/IMG_8673.JPG`,
    alt: 'A portrait from the wedding',
    caption: 'With love',
  },
]

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#0f0e14]">
      <EnvelopeScene galleryImages={galleryImages} />
    </main>
  )
}
