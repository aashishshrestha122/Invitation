import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Aashish & Subbechya | Wedding Invitation',
  description: 'A cinematic wedding invitation with immersive envelope storytelling.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className={`${display.variable} ${body.variable} h-full overflow-hidden bg-[#fff8f0] text-[#3a2928] antialiased`}>{children}</body>
    </html>
  )
}
