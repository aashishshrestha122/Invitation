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
  {
    src: `${basePath}/photos/3958B8E3-C7CF-4DF0-9848-8941859A1B71_4_5005_c.jpeg`,
    alt: 'Couple standing by a coastal road',
    caption: 'A coastal escape',
  },
  {
    src: `${basePath}/photos/5F155002-B183-4AC0-84B3-FD8F0F0057B2_4_5005_c.jpeg`,
    alt: 'Couple standing by the water',
    caption: 'Together by the water',
  },
  {
    src: `${basePath}/photos/F020DA65-B992-4A0C-B0C0-2F5190851A31_1_105_c.jpeg`,
    alt: 'Close-up portrait of the couple',
    caption: 'A cozy moment',
  },
  {
    src: `${basePath}/photos/6F376DA9-A9EE-4421-AC06-B4C57D099926_1_102_o.jpeg`,
    alt: 'Couple smiling together by the ocean',
    caption: 'Seaside smiles',
  },
]

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#0f0e14]">
      <EnvelopeScene galleryImages={galleryImages} />
    </main>
  )
}
